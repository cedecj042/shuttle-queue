<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = [
        'player_id',
        'player_name',
        'game_session_id',
        'gender',
        'player_skill',
        'status',
        'idle_time',
        'created_at',
        'updated_at',
    ];

    public function gameSession()
    {
        return $this->belongsTo(GameSession::class);
    }

    public function matches()
    {
        return $this->belongsToMany(GameMatch::class, 'game_match_player', 'player_id', 'game_match_id');
    }
}
