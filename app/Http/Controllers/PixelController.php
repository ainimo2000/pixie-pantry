<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class PixelController extends Controller
{
    public function index()
    {
        // 1. Fetch Data from TheMealDB API
        try {
            $response = Http::timeout(3)->get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'); //API
            $recipes = $response->successful() ? $response->json()['meals'] : [];
        } catch (\Exception $e) {
            // If internet fails, show empty list (or you can add fallback data here)
            $recipes = [];
        }

        // 2. Send data to the Frontend
        return Inertia::render('Welcome', [
            'recipes' => $recipes,
        ]);
    }
}
