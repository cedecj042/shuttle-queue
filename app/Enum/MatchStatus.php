<?php

namespace App\Enum;

enum MatchStatus: string
{
    case Active = 'active';
    case Completed = 'completed';
    case Ongoing = 'ongoing';
    case Cancelled = 'cancelled';
    case Idle = 'idle';
}
