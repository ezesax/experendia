<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Zone extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [

        'parent_id',
        'name',
        'slug',
        'denomination',
        'latitude',
        'longitude',
        'status'
    ];
}
