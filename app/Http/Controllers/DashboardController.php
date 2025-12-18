<?php

namespace App\Http\Controllers; // <-- CRITICAL: ADD THE SEMICOLON HERE

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __invoke()
    {
        // FIX: Change auth()->user() to Auth::user() to clear the IDE error
        $userRecipes = Auth::user()->savedRecipes()->latest()->get();

        return Inertia::render('Dashboard', [
            'recipes' => $userRecipes, // Only the user's recipes are passed
        ]);
    }
}
