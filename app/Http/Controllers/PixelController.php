<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\SavedRecipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class PixelController extends Controller
{
    public function index()
    {
        $cacheKey = 'mealdb_desserts';
        $recipes = Cache::remember($cacheKey, 86400, function () {
            try {
                $response = Http::timeout(3)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
                $meals = $response->successful() && $response->json('meals') ? $response->json('meals') : [];
                return array_slice($meals, 0, 8);
            } catch (\Exception $e) {
                return [];
            }
        });

        return Inertia::render('Welcome', ['recipes' => $recipes]);
    }

    public function dashboard()
    {
        $myRecipes = SavedRecipe::where('user_id', Auth::id())->latest()->get();
        return Inertia::render('Dashboard', ['myRecipes' => $myRecipes]);
    }

    // ✅ FIXED: Fetch full recipe details from API before saving
    public function store(Request $request)
    {
        $validated = $request->validate([
            'api_id' => 'required|string',
            'title' => 'required|string|max:255',
            'image' => 'required|url|max:512',
        ]);

        // Check if already saved
        $exists = SavedRecipe::where('user_id', Auth::id())
            ->where('api_id', $validated['api_id'])
            ->exists();

        if ($exists) {
            return redirect()->route('dashboard')->with('info', 'Recipe already in your kitchen!');
        }

        // ✅ FETCH FULL RECIPE DETAILS FROM API
        try {
            $response = Http::timeout(5)->get("https://www.themealdb.com/api/json/v1/1/lookup.php?i={$validated['api_id']}");

            if ($response->successful() && $response->json('meals')) {
                $meal = $response->json('meals')[0];

                // Extract ingredients
                $ingredients = [];
                for ($i = 1; $i <= 20; $i++) {
                    $ingredient = $meal["strIngredient{$i}"] ?? '';
                    $measure = $meal["strMeasure{$i}"] ?? '';

                    if (!empty($ingredient)) {
                        $ingredients[] = trim($measure) . ' ' . trim($ingredient);
                    }
                }

                SavedRecipe::create([
                    'user_id' => Auth::id(),
                    'api_id' => $validated['api_id'],
                    'title' => $meal['strMeal'],
                    'image' => $meal['strMealThumb'],
                    'ingredients' => implode("\n", $ingredients),
                    'instructions' => $meal['strInstructions'] ?? '',
                ]);

                return redirect()->route('dashboard')->with('success', 'Recipe saved successfully!');
            }
        } catch (\Exception $e) {
            \Log::error('API fetch error: ' . $e->getMessage());
        }

        // Fallback: save without details
        SavedRecipe::create([
            'user_id' => Auth::id(),
            'api_id' => $validated['api_id'],
            'title' => $validated['title'],
            'image' => $validated['image'],
            'ingredients' => '',
            'instructions' => '',
        ]);

        return redirect()->route('dashboard')->with('warning', 'Recipe saved but details unavailable.');
    }

    public function create()
    {
        return Inertia::render('Create');
    }

    public function storeCustom(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048', // ✅ Changed to file upload
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
        ]);

        // ✅ HANDLE IMAGE UPLOAD
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipes', 'public');
            $imagePath = asset('storage/' . $imagePath);
        }

        SavedRecipe::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'image' => $imagePath, // ✅ Save the uploaded image path
            'ingredients' => $validated['ingredients'],
            'instructions' => $validated['instructions'],
            'api_id' => null,
        ]);

        return redirect()->route('dashboard')->with('success', 'Recipe created successfully!');
    }

    public function update(Request $request, string $id)
    {
        $recipe = SavedRecipe::findOrFail($id);

        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);

        $recipe->update($validated);
        return redirect()->route('dashboard')->with('success', 'Note updated successfully!');
    }

    public function destroy(string $id)
    {
        $recipe = SavedRecipe::findOrFail($id);

        if ($recipe->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $recipe->delete();
        return redirect()->route('dashboard')->with('success', 'Recipe successfully discarded!');
    }

    public function searchMyRecipes(Request $request)
    {
        $query = $request->input('q', '');

        $recipes = SavedRecipe::where('user_id', Auth::id())
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('ingredients', 'LIKE', "%{$query}%");
            })
            ->latest()
            ->get();

        return Inertia::render('Dashboard', [
            'myRecipes' => $recipes,
            'searchQuery' => $query,
        ]);
    }

    // ✅ FIXED: Search includes API recipes
    public function search(Request $request)
    {
        $query = $request->input('q', '');

        // Search user's recipes
        $myRecipes = SavedRecipe::where('user_id', Auth::id())
            ->where(function ($q) use ($query) {
                $q->where('title', 'LIKE', "%{$query}%")
                    ->orWhere('ingredients', 'LIKE', "%{$query}%");
            })
            ->latest()
            ->get();

        // ✅ SEARCH API RECIPES
        $apiRecipes = collect([]);
        if (!empty($query)) {
            try {
                $response = Http::timeout(5)->get("https://www.themealdb.com/api/json/v1/1/search.php?s={$query}");

                if ($response->successful() && $response->json('meals')) {
                    $apiRecipes = collect($response->json('meals'))->map(function ($meal) {
                        return [
                            'id' => 'api_' . $meal['idMeal'],
                            'title' => $meal['strMeal'],
                            'image' => $meal['strMealThumb'],
                            'user' => ['name' => 'TheMealDB'],
                            'created_at' => now(),
                            'source' => 'api',
                            'api_id' => $meal['idMeal'],
                        ];
                    });
                }
            } catch (\Exception $e) {
                \Log::error('API search error: ' . $e->getMessage());
            }
        }

        // Merge results
        $communityRecipes = collect($myRecipes)->map(function ($recipe) {
            return [
                'id' => $recipe->id,
                'title' => $recipe->title,
                'image' => $recipe->image,
                'user' => ['name' => $recipe->user->name ?? 'Unknown'],
                'created_at' => $recipe->created_at,
                'source' => 'user',
            ];
        })->concat($apiRecipes);

        return Inertia::render('SearchResults', [
            'myRecipes' => $myRecipes,
            'communityRecipes' => $communityRecipes,
            'searchQuery' => $query,
        ]);
    }

    public function about()
    {
        return Inertia::render('About');
    }
}
