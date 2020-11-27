<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ForbiddenWord extends Model
{
    use SoftDeletes;

    protected $fillable = [

        'id',
        'name',
        'status'
    ];
}
