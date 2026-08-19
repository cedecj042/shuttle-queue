<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlayerResource extends JsonResource
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
            'player_name' => $this->player_name,
            'gender' => $this->gender,
            'player_skill' => $this->player_skill,
            'status' => $this->status,
            'idle_time' => $this->idle_time,
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'matches' => GameMatchResource::collection($this->whenLoaded('matches')),
            'sessions' => SessionResource::collection($this->whenLoaded('sessions')),
            'match_count' => $this->matches()->count(),
            'session_count' => $this->sessions()->count(),
        ];
    }
}