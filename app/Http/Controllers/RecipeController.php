<?php

namespace App\Http\Controllers;

use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RecipeController extends Controller
{
    public function feed()
    {
        // Get user-created recipes
        $userRecipes = SavedRecipe::with('user')
            ->latest()
            ->get()
            ->map(function ($recipe) {
                return [
                    'id' => $recipe->id,
                    'title' => $recipe->title,
                    'image' => $recipe->image,
                    'user' => [
                        'name' => $recipe->user->name ?? 'Unknown'
                    ],
                    'created_at' => $recipe->created_at,
                    'source' => 'user',
                ];
            });

        // Get API recipes (cached)
        $apiRecipes = Cache::remember('community_mealdb_feed', 3600, function () {
            try {
                $response = Http::timeout(5)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');

                if ($response->successful() && $response->json('meals')) {
                    return collect($response->json('meals'))
                        ->take(20)
                        ->map(function ($meal) {
                            return [
                                'id' => 'api_' . $meal['idMeal'],
                                'title' => $meal['strMeal'],
                                'image' => $meal['strMealThumb'],
                                'user' => ['name' => 'TheMealDB'],
                                'created_at' => now(),
                                'source' => 'api',
                                'api_id' => $meal['idMeal'],
                            ];
                        })
                        ->toArray();
                }
                return [];
            } catch (\Exception $e) {
                \Log::error('MealDB API Error: ' . $e->getMessage());
                return [];
            }
        });

        // Merge and shuffle
        $allRecipes = collect($userRecipes)->concat($apiRecipes)->shuffle();

        return Inertia::render('Community/Feed', [
            'recipes' => $allRecipes,
        ]);
    }


    public function searchCommunity(Request $request)
    {
        $query = $request->input('q', '');

        // Search only user recipes (not API)
        $recipes = SavedRecipe::with('user')
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('ingredients', 'LIKE', "%{$query}%");
            })
            ->latest()
            ->get()
            ->map(function ($recipe) {
                return [
                    'id' => $recipe->id,
                    'title' => $recipe->title,
                    'image' => $recipe->image,
                    'user' => [
                        'name' => $recipe->user->name ?? 'Unknown'
                    ],
                    'created_at' => $recipe->created_at,
                    'source' => 'user',
                ];
            });

        return Inertia::render('Community/Feed', [
            'recipes' => $recipes,
            'searchQuery' => $query,
        ]);
    }

    /**
     * Show API recipe details (from TheMealDB)
     */
    public function showApiRecipe($id)
    {
        try {
            // Fetch full recipe details from TheMealDB API
            $response = Http::timeout(5)->get("https://www.themealdb.com/api/json/v1/1/lookup.php?i={$id}");

            if ($response->successful() && $response->json('meals')) {
                $meal = $response->json('meals')[0];

                // Extract all 20 possible ingredients
                $ingredients = [];
                for ($i = 1; $i <= 20; $i++) {
                    $ingredient = $meal["strIngredient{$i}"] ?? '';
                    $measure = $meal["strMeasure{$i}"] ?? '';

                    if (!empty($ingredient)) {
                        $ingredients[] = trim($measure) . ' ' . trim($ingredient);
                    }
                }

                // Format recipe data for the view
                $recipe = [
                    'id' => 'api_' . $meal['idMeal'],
                    'api_id' => $meal['idMeal'],
                    'title' => $meal['strMeal'],
                    'image' => $meal['strMealThumb'],
                    'ingredients' => implode("\n", $ingredients),
                    'instructions' => $meal['strInstructions'] ?? 'No instructions available.',
                    'category' => $meal['strCategory'] ?? 'Unknown',
                    'area' => $meal['strArea'] ?? 'Unknown',
                    'youtube' => $meal['strYoutube'] ?? null,
                    'source' => 'api',
                    'created_at' => now(),
                ];

                return Inertia::render('Recipes/ShowApi', [
                    'recipe' => $recipe,
                ]);
            }

            abort(404, 'Recipe not found in TheMealDB');
        } catch (\Exception $e) {
            \Log::error('API Recipe Fetch Error: ' . $e->getMessage());
            return redirect()->route('community.feed')
                ->with('error', 'Unable to fetch recipe details from API.');
        }
    }

    /**
     * Show recipe details
     */
    public function show(SavedRecipe $recipe)
    {
        $recipe->load('user');

        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }

    /**
     * Show edit form
     */
    public function edit(SavedRecipe $recipe)
    {
        // Ensure user owns the recipe
        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    /**
     * Update recipe
     */
    public function update(Request $request, SavedRecipe $recipe)
    {
        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // ✅ Optional on update
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'notes' => 'nullable|string|max:1000',
        ]);

        // ✅ HANDLE IMAGE UPLOAD (if new image provided)
        if ($request->hasFile('image')) {
            // Delete old image
            if ($recipe->image && str_contains($recipe->image, 'storage/recipes/')) {
                $oldPath = str_replace(asset('storage/'), '', $recipe->image);
                Storage::disk('public')->delete($oldPath);
            }

            // Upload new image
            $imagePath = $request->file('image')->store('recipes', 'public');
            $validated['image'] = asset('storage/' . $imagePath);
        }

        $recipe->update($validated);

        return redirect()->route('recipes.show', $recipe->id)
            ->with('success', 'Recipe updated successfully!');
    }

    /**
     * Delete recipe
     */
    public function destroy(SavedRecipe $recipe)
    {
        // Ensure user owns the recipe
        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $recipe->delete();

        return redirect()->route('community.feed')
            ->with('success', 'Recipe deleted successfully!');
    }
}
