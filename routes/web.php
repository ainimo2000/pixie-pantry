<?php
// FILE: routes/web.php
// REPLACE your current web.php with this CLEAN version

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PixelController;
use App\Http\Controllers\RecipeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes (No Authentication Required)
|--------------------------------------------------------------------------
*/

Route::get('/', [PixelController::class, 'index'])->name('home');
Route::get('/about', [PixelController::class, 'about'])->name('about');

// Community Feed - Public or Auth (your choice)
Route::get('/community/feed', [RecipeController::class, 'index'])->name('community.feed');

/*
|--------------------------------------------------------------------------
| Protected Routes (Authentication Required)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    // ===== DASHBOARD =====
    Route::get('/dashboard', [PixelController::class, 'dashboard'])->name('dashboard');

    // ===== CREATE RECIPES =====
    // Show create form
    Route::get('/recipes/create', [PixelController::class, 'create'])->name('recipes.create');

    // Store API recipe (from Welcome page "Save" button)
    Route::post('/recipes', [PixelController::class, 'store'])->name('recipes.store');

    // Store custom recipe (from Create form)
    Route::post('/recipes/custom', [PixelController::class, 'storeCustom'])->name('recipes.store_custom');

    // ===== VIEW RECIPE =====
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');

    // ===== EDIT RECIPE =====
    // Show edit form
    Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');

    // Update recipe
    Route::put('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');

    // ===== DELETE RECIPE =====
    Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

    // ===== PROFILE ROUTES =====
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Laravel Breeze)
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';
