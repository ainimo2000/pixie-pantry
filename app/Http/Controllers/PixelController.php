<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\SavedRecipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache; // <--- ADDED: Caching library

class PixelController extends Controller
{
    // --- READ (Public API) ---
    public function index()
    {
        $cacheKey = 'mealdb_desserts'; // Unique key for this data

        // Use Cache::remember to store data for 24 hours (86400 seconds)
        $recipes = Cache::remember($cacheKey, 86400, function () {
            try {
                // Fetch Desserts from API
                $response = Http::timeout(3)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');

                // Check for success and return the meals, or an empty array
                $meals = $response->successful() && $response->json('meals')
                    ? $response->json('meals')
                    : [];

                // Return only the first 8 for display as "Fresh Drops"
                return array_slice($meals, 0, 8);
            } catch (\Exception $e) {
                // Return empty array on connection failure
                return [];
            }
        });

        return Inertia::render('Welcome', [
            'recipes' => $recipes,
        ]);
    }

    // --- READ (Private Dashboard) ---
    public function dashboard()
    {
        // Get recipes belonging to the logged-in user
        $myRecipes = SavedRecipe::where('user_id', Auth::id())->latest()->get();

        return Inertia::render('Dashboard', [
            'myRecipes' => $myRecipes
        ]);
    }

    // --- CREATE (Save from API) ---
    public function store(Request $request)
    {
        $exists = SavedRecipe::where('user_id', Auth::id())
            ->where('api_id', $request->api_id)
            ->exists();

        if (!$exists) {
            SavedRecipe::create([
                'user_id' => Auth::id(),
                'api_id' => $request->api_id,
                'title' => $request->title,
                'image' => $request->image,
            ]);
        }

        return redirect()->back();
    }

    // --- CREATE (Custom Recipe Form) ---
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    // --- CREATE (Save Custom Recipe) ---
    public function storeCustom(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required', // We accept a URL string
        ]);

        SavedRecipe::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'image' => $request->image,
            'ingredients' => $request->ingredients,
            'instructions' => $request->instructions,
            'api_id' => null, // Null means it's a custom recipe
        ]);

        return redirect()->route('dashboard');
    }

    // --- UPDATE (Edit Notes) ---
    public function update(Request $request, $id)
    {
        $recipe = SavedRecipe::where('user_id', Auth::id())->findOrFail($id);

        $recipe->update([
            'notes' => $request->notes
        ]);

        return redirect()->back();
    }

    // --- DELETE (Discard Item) ---
    public function destroy($id)
    {
        $recipe = SavedRecipe::where('user_id', Auth::id())->findOrFail($id);
        $recipe->delete();

        return redirect()->back();
    }

    // --- READ (About Page) ---
    public function about()
    {
        return Inertia::render('About');
    }
}
