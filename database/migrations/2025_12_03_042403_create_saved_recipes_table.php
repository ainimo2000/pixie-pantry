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

            // User relationship
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Recipe basic info
            $table->string('title');
            $table->string('image')->nullable();
            $table->text('ingredients')->nullable();
            $table->text('instructions')->nullable();

            // API tracking
            $table->string('api_id')->nullable();

            // User's personal data
            $table->text('notes')->nullable(); // ← THIS IS NEW!

            $table->timestamps();

            // Indexes
            $table->index('user_id');
            $table->index('created_at');
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
