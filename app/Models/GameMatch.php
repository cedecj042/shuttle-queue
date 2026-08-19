<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'game_session_id',
        'court_id',
        'match_status',
        'team1_score',
        'team2_score',
        'winner_team',
        'created_at',
        'updated_at',
    ];

    public function gameSession()
    {
        return $this->belongsTo(GameSession::class);
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function players()
    {
        return $this->belongsToMany(
            Player::class,
            'game_match_players',
            'match_id',
            'player_id'
        )
        ->withPivot(['team_number','player_number',])
        ->withTimestamps();
    }
}
