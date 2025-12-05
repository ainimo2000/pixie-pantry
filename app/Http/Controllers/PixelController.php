<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use App\Models\SavedRecipe;
use Illuminate\Support\Facades\Auth;

class PixelController extends Controller
{
    // --- READ (Public) ---
    public function index()
    {
        try {
            // Fetch Dessert data from TheMealDB API
            $response = Http::timeout(5)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
            $recipes = $response->successful() ? $response->json()['meals'] : [];
        } catch (\Exception $e) {
            $recipes = []; // Fail gracefully if API is down
        }

        return Inertia::render('Welcome', [
            'recipes' => $recipes,
        ]);
    }

    // --- READ (Private Dashboard) ---
    public function dashboard()
    {
        // Fetch only the logged-in user's recipes
        $myRecipes = SavedRecipe::where('user_id', Auth::id())->latest()->get();

        return Inertia::render('Dashboard', [
            'myRecipes' => $myRecipes
        ]);
    }

    // --- CREATE (Save from API) ---
    public function store(Request $request)
    {
        // Prevent duplicates
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

    // --- CREATE (Custom Recipe) ---
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    public function storeCustom(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'ingredients' => 'required',
            'instructions' => 'required',
        ]);

        SavedRecipe::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'image' => $request->image,
            'ingredients' => $request->ingredients,
            'instructions' => $request->instructions,
            'api_id' => null, // It's custom!
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

    // --- DELETE (Remove Recipe) ---
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
