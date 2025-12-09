<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedRecipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', // 🎯 FIX 2: Added to the fillable array
        'title',
        'image',
        'ingredients',
        'instructions',
        'api_id',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
