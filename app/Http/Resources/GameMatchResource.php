<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameMatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'game_session_id' => $this->game_session_id,
            'court_id' => $this->court_id,
            'match_status' => $this->match_status,
            'team1_score' => $this->team1_score,
            'team2_score' => $this->team2_score,
            'winner_team' => $this->winner_team,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'game_session' => new GameSessionResource($this->whenLoaded('gameSession')),
            'court' => new CourtResource($this->whenLoaded('court')),
        ];
    }
}
