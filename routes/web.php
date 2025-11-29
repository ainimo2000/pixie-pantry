<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PixelController; // <--- The most important line!

// --- CONNECTING TO REAL DATA ---
Route::get('/', [PixelController::class, 'index'])->name('home');

// --- DASHBOARD (Protected) ---
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 3. Save Recipe (Protected)
Route::post('/recipes', [PixelController::class, 'store'])
    ->middleware(['auth'])
    ->name('recipes.store');

// 4. UPDATE Note (New!)
Route::put('/recipes/{id}', [PixelController::class, 'update'])
    ->middleware(['auth'])
    ->name('recipes.update');

// 5. DELETE Recipe (New!)
Route::delete('/recipes/{id}', [PixelController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('recipes.destroy');

Route::get('/', [PixelController::class, 'index'])->name('home');
Route::get('/about', [PixelController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [PixelController::class, 'dashboard'])->name('dashboard');

    // Saving API Recipe
    Route::post('/recipes', [PixelController::class, 'store'])->name('recipes.store');

    // Creating Custom Recipe
    Route::get('/recipes/create', [PixelController::class, 'create'])->name('recipes.create');
    Route::post('/recipes/custom', [PixelController::class, 'storeCustom'])->name('recipes.store_custom');

    // Update/Delete
    Route::put('/recipes/{id}', [PixelController::class, 'update'])->name('recipes.update');
    Route::delete('/recipes/{id}', [PixelController::class, 'destroy'])->name('recipes.destroy');
});

require __DIR__ . '/auth.php';
