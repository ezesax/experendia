<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LevelPoint extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'points',
        'level'
    ];
}
