<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('saved_recipes', function (Blueprint $table) {
            $table->id();

            // REQUIRED: Links the recipe to the user (Fixes the SQL error)
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Stores the recipe title
            $table->string('title');

            // Stores the Image URL (This is how you "add images")
            $table->string('image');

            // Fields for Custom Recipes (Allow null for API-saved items)
            $table->text('ingredients')->nullable();
            $table->text('instructions')->nullable();
            $table->text('notes')->nullable();

            // Field for API-saved recipes (Allow null for custom recipes)
            $table->string('api_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_recipes');
    }
};
