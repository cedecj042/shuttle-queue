<?php

namespace App\Enum;

enum GameSessionStatus: string
{
    case Active = 'active';
    case Completed = 'completed';
    case Ongoing = 'ongoing';
    case Cancelled = 'cancelled';
    case Inactive = 'inactive';
}