<?php

namespace App\Enum;

enum SessionStatus: string
{
    case Active = 'active';
    case Completed = 'completed';
    case Ongoing = 'ongoing';
    case Cancelled = 'cancelled';
    case Inactive = 'inactive';
}