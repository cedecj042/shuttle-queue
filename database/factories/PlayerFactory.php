<?php

namespace Database\Factories;

use App\Models\GameSession;
use Illuminate\Database\Eloquent\Factories\Factory;

class PlayerFactory extends Factory
{
    public function definition(): array
    {
        return [
            'game_session_id' => GameSession::factory(),
            'player_name' => fake()->name(),
            'gender' => fake()->randomElement(['male', 'female']),
            'player_skill' => fake()->randomElement(['beginner', 'intermediate-low', 'intermediate-high', 'advanced']),
            'status' => fake()->randomElement(['active', 'inactive']),
            'idle_time' => null,
        ];
    }
}
