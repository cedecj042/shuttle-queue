<?php

namespace Database\Seeders;

use App\Models\Court;
use App\Models\GameMatch;
use App\Models\GameSession;
use App\Models\Player;
use Illuminate\Database\Seeder;

class GameSessionSeeder extends Seeder
{
    public function run(): void
    {
        GameSession::factory(2)->create()->each(function (GameSession $session) {
            $courts = Court::factory(2)->create([
                'game_session_id' => $session->id,
            ]);

            $players = Player::factory(8)->create([
                'game_session_id' => $session->id,
            ]);

            $courts->each(function (Court $court) use ($session, $players) {
                $match = GameMatch::factory()->create([
                    'game_session_id' => $session->id,
                    'court_id' => $court->id,
                ]);

                $matchPlayers = $players->random(4)->values();

                foreach ($matchPlayers as $index => $player) {
                    $match->players()->attach($player->id, [
                        'team_number' => intdiv($index, 2) + 1,
                        'player_number' => ($index % 2) + 1,
                    ]);
                }
            });
        });
    }
}
