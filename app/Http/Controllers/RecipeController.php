<?php

namespace App\Http\Controllers;

use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
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
        // Ensure user owns the recipe
        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
            'notes' => 'nullable|string|max:1000',
        ]);

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
