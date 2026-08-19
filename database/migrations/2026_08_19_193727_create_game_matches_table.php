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
        Schema::create('game_matches', function (Blueprint $table) {
            $table->id('game_match_id');
            $table->foreignId('session_id')->constrained('sessions');
            $table->foreignId('court_id')->constrained('courts');
            $table->enum('match_status',['active','completed','ongoing','cancelled','idle'])->default('idle');
            $table->integer('team1_score')->default(0);
            $table->integer('team2_score')->default(0);
            $table->integer('winner_team')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
