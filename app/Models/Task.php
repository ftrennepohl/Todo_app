<?php

namespace App\Models;

use App\Enums\Situations;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected function casts(): array
    {
        return [
            'situacao' => Situations::class
        ];
    }
}
