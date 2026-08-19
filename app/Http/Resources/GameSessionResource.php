<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameSessionResource extends JsonResource
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
            'session_name' => $this->session_name,
            'status' => $this->status,
            'session_date' => Carbon::parse($this->session_date)->format('F j, Y'),
            'session_date_raw' => Carbon::parse($this->session_date)->format('Y-m-d'),
            'players_count' => $this->whenCounted('players'),
            'created_at' => Carbon::parse($this->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d H:i:s'),
            'matches' => GameMatchResource::collection($this->whenLoaded('matches')),
            'players' => PlayerResource::collection($this->whenLoaded('players')),
        ];
    }
}
