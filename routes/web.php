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

    // UPDATE: Edit Note
    Route::put('/recipes/{id}', [PixelController::class, 'update'])->name('recipes.update');

    // DELETE: Remove Recipe
    Route::delete('/recipes/{id}', [PixelController::class, 'destroy'])->name('recipes.destroy');
});

require __DIR__ . '/auth.php';
