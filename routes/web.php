<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PixelController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Pages
Route::get('/', [PixelController::class, 'index'])->name('home');
Route::get('/about', [PixelController::class, 'about'])->name('about');

// Protected Pages (Must be Logged In)
Route::middleware(['auth', 'verified'])->group(function () {

    // READ: Dashboard
    Route::get('/dashboard', [PixelController::class, 'dashboard'])->name('dashboard');

    // CREATE: Save API Recipe
    Route::post('/recipes', [PixelController::class, 'store'])->name('recipes.store');

    // CREATE: Custom Recipe Page & Save
    Route::get('/recipes/create', [PixelController::class, 'create'])->name('recipes.create');
    Route::post('/recipes/custom', [PixelController::class, 'storeCustom'])->name('recipes.store_custom');
    Route::post('/recipes/custom', [PixelController::class, 'store'])
        ->middleware(['auth', 'verified'])
        ->name('recipes.store'); // Use a consistent name
    // Route to show the edit form (GET request)
    Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');

    // Route to handle the form submission (PUT/PATCH request for updating)
    Route::put('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');

    // DELETE: Remove Recipe
    Route::delete('/inventory/{id}', [PixelController::class, 'destroy'])->name('recipes.destroy');
});

use App\Http\Controllers\RecipeController;

Route::middleware(['auth', 'verified'])->group(function () {
    // Show the edit form (GET request)
    Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');

    // Process the form submission (PUT request for update)
    // The {recipe} parameter automatically finds the Recipe model instance (Route Model Binding)
    Route::put('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');

    // Ensure your destroy route is also defined if you use this controller for it
    Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // ... existing routes (edit, update, destroy) ...

    // New Route to display the full recipe details
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');
});

require __DIR__ . '/auth.php';
