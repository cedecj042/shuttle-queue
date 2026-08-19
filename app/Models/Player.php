<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
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
        return $this->belongsToMany(GameMatch::class, 'game_match_players', 'player_id', 'match_id')
            ->withPivot(['team_number', 'player_number'])
            ->withTimestamps();
    }
}
