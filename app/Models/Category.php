<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
