<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GameSessionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'session_name' => 'Session ' . fake()->unique()->numberBetween(1, 1000),
            'status' => fake()->randomElement(['active', 'completed', 'ongoing', 'cancelled', 'inactive']),
            'session_date' => fake()->dateTimeBetween('-1 week', '+1 week'),
        ];
    }
}
