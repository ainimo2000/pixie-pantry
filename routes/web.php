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

require __DIR__ . '/auth.php';
