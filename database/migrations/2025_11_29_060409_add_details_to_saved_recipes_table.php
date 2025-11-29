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
        Schema::table('saved_recipes', function (Blueprint $table) {
            $table->text('ingredients')->nullable();
            $table->text('instructions')->nullable();
            $table->string('api_id')->nullable()->change(); // Allow null for custom recipes
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('saved_recipes', function (Blueprint $table) {
            //
        });
    }
};
