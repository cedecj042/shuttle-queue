<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_name',
        'status',
        'session_date',
        'created_at',
        'updated_at',
    ];

    public function matches()
    {
        return $this->hasMany(GameMatch::class);
    }

    public function players()
    {
        return $this->hasMany(Player::class);
    }
}
