<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameMatch extends Model
{
    protected $fillable = [
        'game_match_id',
        'session_id',
        'court_id',
        'match_status',
        'created_at',
        'updated_at',
    ];

    public function session()
    {
        return $this->belongsTo(Session::class);
    }

    public function court()
    {
        return $this->belongsTo(Court::class);
    }

    public function players()
    {
        return $this->belongsToMany(Player::class, 'game_match_players', 'match_id', 'player_id')
            ->withPivot('team_number', 'player_number');
    }
}
