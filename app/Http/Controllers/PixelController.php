<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PixelController extends Controller
{
    public function index()
    {
        // 1. Fetch Data from TheMealDB API
        try {
            $response = Http::timeout(3)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'); //API
            $recipes = $response->successful() ? $response->json()['meals'] : [];
        } catch (\Exception $e) {
            // If internet fails, show empty list (or you can add fallback data here)
            $recipes = [];
        }

        // 2. Send data to the Frontend
        return Inertia::render('Welcome', [
            'recipes' => $recipes,
        ]);
    }

    // 4. Update the Note (The "Edit" Feature)
    public function update(Request $request, $id)
    {
        $recipe = SavedRecipe::where('user_id', Auth::id())->findOrFail($id);

        $recipe->update([
            'notes' => $request->notes
        ]);

        return redirect()->back();
    }

    // 5. Delete the Recipe (The "Remove" Feature)
    public function destroy($id)
    {
        $recipe = SavedRecipe::where('user_id', Auth::id())->findOrFail($id);
        $recipe->delete();

        return redirect()->back();
    }

    // Show Create Page
    public function create()
    {
        return Inertia::render('Recipes/Create');
    }

    // Save Custom Recipe
    public function storeCustom(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'image' => 'required|url',
        ]);

        SavedRecipe::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'image' => $request->image,
            'ingredients' => $request->ingredients,
            'instructions' => $request->instructions,
            'api_id' => null, // It's custom, so no API ID
        ]);

        return redirect()->route('dashboard');
    }

    // Show About Page
    public function about()
    {
        return Inertia::render('About');
    }
}
