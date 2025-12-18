<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class SavedRecipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'image',
        'ingredients',
        'instructions',
        'api_id',
        'notes', // ← ADD THIS LINE
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
