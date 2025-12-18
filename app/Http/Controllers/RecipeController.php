<?php

namespace App\Http\Controllers;

use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
// CRITICAL: Ensure this line is present to use Auth::id()
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function edit(SavedRecipe $recipe)
    {
        // FIX: Using Auth::id() to satisfy the IDE (Intelephense)
        if (Auth::id() !== $recipe->user_id) { // Use Auth::id()
            abort(403, 'Unauthorized action.');
        }
        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    // Method to handle the PUT request (form submission) to update the recipe
    public function update(Request $request, SavedRecipe $recipe)
    {
        // 1. Authorization Check (Owner Only) - Using Auth::id()
        if (Auth::id() !== $recipe->user_id) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Data Validation (Validation removed for brevity, assuming you have it)

        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'image' => ['required', 'string', 'max:2048'],
            'ingredients' => ['required', 'string'],
            'instructions' => ['required', 'string'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        // 3. Update the model attributes
        $recipe->update($validatedData);

        // 4. Redirect with a success message
        return redirect()->route('dashboard')->with('success', 'Recipe updated successfully!');
    }

    // Example of a minimal destroy method if you use RecipeController for it:
    public function destroy(SavedRecipe $recipe)
    {
        // Owner Only - Using Auth::id()
        if (Auth::id() !== $recipe->user_id) {
            abort(403);
        }
        $recipe->delete();
        return redirect()->route('dashboard')->with('success', 'Recipe discarded.');
    }

    public function show(SavedRecipe $recipe)
    {
        // 🚨 CRITICAL FIX: The authorization check is REMOVED to allow community viewing.
        // This stops the 403 error when clicking other users' recipes.

        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }

    public function index()
    {
        $communityRecipes = \App\Models\SavedRecipe::with('user')
            ->latest()
            ->get();

        return Inertia::render('Community/Feed', [
            'recipes' => $communityRecipes,
        ]);
    }
}
