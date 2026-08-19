<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameSession extends Model
{
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
}
