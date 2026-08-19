<?php

namespace Database\Factories;

use App\Models\Court;
use App\Models\GameSession;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameMatchFactory extends Factory
{
    public function definition(): array
    {
        return [
            'game_session_id' => GameSession::factory(),
            'court_id' => Court::factory(),
            'match_status' => fake()->randomElement(['active', 'completed', 'ongoing', 'cancelled', 'idle']),
            'team1_score' => 0,
            'team2_score' => 0,
            'winner_team' => null,
        ];
    }
}
