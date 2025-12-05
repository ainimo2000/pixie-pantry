<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PixelController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // <--- This line is CRITICAL!

// Public Routes
Route::get('/', [PixelController::class, 'index'])->name('home');
Route::get('/about', [PixelController::class, 'about'])->name('about');

// Protected Routes (Must be logged in)
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard (Read)
    Route::get('/dashboard', [PixelController::class, 'dashboard'])->name('dashboard');

    // Save from API (Create)
    Route::post('/recipes', [PixelController::class, 'store'])->name('recipes.store');

    // Create Custom (Create)
    Route::get('/recipes/create', [PixelController::class, 'create'])->name('recipes.create');
    Route::post('/recipes/custom', [PixelController::class, 'storeCustom'])->name('recipes.store_custom');

    // Update Notes (Update)
    Route::put('/recipes/{id}', [PixelController::class, 'update'])->name('recipes.update');

    // Delete Recipe (Delete)
    Route::delete('/recipes/{id}', [PixelController::class, 'destroy'])->name('recipes.destroy');
});

// Profile Routes (Default Laravel)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
