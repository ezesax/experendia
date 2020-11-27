<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Channel extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'parent_id',
        'name',
        'slug',
        'status'
    ];
}
