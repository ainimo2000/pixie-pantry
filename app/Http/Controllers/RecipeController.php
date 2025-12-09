<?php

namespace App\Http\Controllers;

use App\Models\SavedRecipe;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RecipeController extends Controller
{
    public function edit(SavedRecipe $recipe)
    {
        if (auth()->id() !== $recipe->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    // Method to handle the PUT request (form submission) to update the recipe
    public function update(Request $request, SavedRecipe $recipe)
    {
        // 1. Authorization Check
        if (auth()->id() !== $recipe->user_id) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Data Validation
        $validatedData = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            // Assuming your frontend uses 'image_url' for the image input name
            'image_url' => ['required', 'url', 'max:2048'],
            'ingredients' => ['required', 'string'],
            'instructions' => ['required', 'string'],
            // The 'notes' field is needed for the inline note edit feature,
            // but is optional for the main recipe form. We include it here
            // because your Dashboard.jsx's `saveNote` function uses this route.
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
        if (auth()->id() !== $recipe->user_id) {
            abort(403);
        }
        $recipe->delete();
        return redirect()->route('dashboard')->with('success', 'Recipe discarded.');
    }

    public function show(SavedRecipe $recipe)
    {
        // 1. Authorization Check (Optional, but good practice)
        // If you only want users to view their own recipes:
        if (auth()->id() !== $recipe->user_id) {
            abort(403, 'Unauthorized action.');
        }

        // 2. Render the new Detail component
        return Inertia::render('Recipes/Show', [
            'recipe' => $recipe,
        ]);
    }
}
