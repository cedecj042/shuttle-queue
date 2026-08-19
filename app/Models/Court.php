<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Court extends Model
{
    protected $fillable = [
        'court_id',
        'court_number',
        'game_session_id',
        'created_at',
        'updated_at',
    ];

    public function matches()
    {
        return $this->hasMany(GameMatch::class);
    }

    public function gameSession()
    {
        return $this->belongsTo(GameSession::class);
    }
}
