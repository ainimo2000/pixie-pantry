<?php
// FILE: routes/web.php
// CORRECTED VERSION - Line 18 fixed!

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

// Community Feed - ✅ FIXED: Changed 'index' to 'feed'
Route::get('/community/feed', [RecipeController::class, 'feed'])->name('community.feed');

/*
|--------------------------------------------------------------------------
| Protected Routes (Authentication Required)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {

    // ===== DASHBOARD =====
    Route::get('/dashboard', [PixelController::class, 'dashboard'])->name('dashboard');

    // ===== CREATE RECIPES =====
    Route::get('/recipes/create', [PixelController::class, 'create'])->name('recipes.create');
    Route::post('/recipes', [PixelController::class, 'store'])->name('recipes.store');
    Route::post('/recipes/custom', [PixelController::class, 'storeCustom'])->name('recipes.store_custom');

    // ===== VIEW RECIPE =====
    Route::get('/recipes/{recipe}', [RecipeController::class, 'show'])->name('recipes.show');

    // ===== EDIT RECIPE =====
    Route::get('/recipes/{recipe}/edit', [RecipeController::class, 'edit'])->name('recipes.edit');
    Route::put('/recipes/{recipe}', [RecipeController::class, 'update'])->name('recipes.update');

    // ===== DELETE RECIPE =====
    Route::delete('/recipes/{recipe}', [RecipeController::class, 'destroy'])->name('recipes.destroy');

    // ===== PROFILE ROUTES =====
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ===== SEARCH ROUTES =====
    Route::get('/search', [PixelController::class, 'search'])->name('search');
    Route::get('/dashboard/search', [PixelController::class, 'searchMyRecipes'])->name('dashboard.search');
    Route::get('/community/search', [RecipeController::class, 'searchCommunity'])->name('community.search');
});

require __DIR__ . '/auth.php';
