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
        Schema::create('game_match_players', function (Blueprint $table) {
            $table->id();
            $table->foreign('match_id')->constrained('game_matches');
            $table->foreign('player_id')->constrained('players');
            $table->integer('team_number');
            $table->integer('player_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('match_players');
    }
};
