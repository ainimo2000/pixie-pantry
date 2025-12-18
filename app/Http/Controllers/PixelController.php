<?php
//PixelController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\SavedRecipe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache; // Critical for API Caching

class PixelController extends Controller
{
    // --- READ (Public API) ---
    public function index()
    {
        $cacheKey = 'mealdb_desserts';

        // Uses Cache::remember to store data for 24 hours (86400 seconds)
        // If the cache exists, it returns the cached data instantly.
        $recipes = Cache::remember($cacheKey, 86400, function () {
            try {
                // Fetch Desserts from TheMealDB API
                $response = Http::timeout(3)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');

                // Check for successful API response
                $meals = $response->successful() && $response->json('meals')
                    ? $response->json('meals')
                    : [];

                // Return only the first 8 for display as "Fresh Drops"
                return array_slice($meals, 0, 8);
            } catch (\Exception $e) {
                // Return empty array on connection failure for graceful error handling
                return [];
            }
        });

        return Inertia::render('Welcome', [
            // Passes the API data (cached or fresh) to the Welcome page
            'recipes' => $recipes,
        ]);
    }

    // --- READ (Private Dashboard) ---
    public function dashboard()
    {
        // Fetches all recipes belonging to the logged-in user (Custom CRUD: Read)
        $myRecipes = SavedRecipe::where('user_id', Auth::id())->latest()->get();

        return Inertia::render('Dashboard', [
            'myRecipes' => $myRecipes
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validation of incoming user data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url|max:512',
            'ingredients' => 'nullable|string',
            'instructions' => 'nullable|string',
        ]);

        // 🎯 FIX 1: Attach the authenticated user's ID before creation
        $validated['user_id'] = Auth::id();

        // 2. Create the new recipe entry
        SavedRecipe::create($validated);

        // 3. Redirect back to the dashboard
        return redirect()->route('dashboard');
    }

    // --- CREATE (Custom Recipe Form View) ---
    public function create()
    {
        // Change 'Recipes/Create' to just 'Create'
        return Inertia::render('Create');
    }

    // --- CREATE (Save Custom Recipe to DB, used by Create.jsx form) ---
    public function storeCustom(Request $request)
    {
        // 1. Validation (Highly Recommended, though not causing this error)
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url', // Assuming you require an image URL
            'ingredients' => 'required|string',
            'instructions' => 'required|string',
        ]);

        // 2. Create the Recipe, ensuring the user_id is passed
        SavedRecipe::create([
            // 🎯 FIX: Add the user_id from the authenticated user 🎯
            'user_id' => auth()->id(), // Gets the ID of the currently logged-in user

            // Pass the validated data
            'title' => $validated['title'],
            'image' => $validated['image'],
            'ingredients' => $validated['ingredients'],
            'instructions' => $validated['instructions'],
            // 'api_id' is null here since it's a custom recipe
            'api_id' => null,
        ]);

        // 3. Redirect back to the Dashboard
        return redirect()->route('dashboard');
    }

    // --- UPDATE (Edit Notes, used on the Dashboard) ---
    public function update(Request $request, string $id)
    {
        // 1. Find the recipe and authorize
        $recipe = SavedRecipe::findOrFail($id);

        // Ensure the current user owns this recipe
        if ($recipe->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Validate the incoming data (just the note)
        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);

        // 3. Update the notes field
        $recipe->update($validated);

        // 4. Redirect and optionally flash a message
        return redirect()->route('dashboard')->with('success', 'Note updated successfully!');
    }

    // --- DELETE (Discard Item, used on the Dashboard) ---
    public function destroy(string $id)
    {
        // 1. Find the recipe and authorize
        $recipe = SavedRecipe::findOrFail($id);

        // Ensure the current user owns this recipe
        if ($recipe->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Delete the record
        $recipe->delete();

        // 3. Redirect and flash a success message (Crucial for the notification!)
        return redirect()->route('dashboard')->with('success', 'Recipe successfully discarded!');
    }

    // --- READ (About Page) ---
    public function about()
    {
        return Inertia::render('About');
    }
}
