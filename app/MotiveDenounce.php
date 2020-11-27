<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MotiveDenounce extends Model
{
    use SoftDeletes;

    protected $fillable = [

        'parent_id',
        'name',
        'description',
        'slug',
        'status'
    ];
}
