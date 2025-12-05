<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedRecipe extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'api_id',
        'title',
        'image',
        'ingredients',
        'instructions',
        'notes'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
