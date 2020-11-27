<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VideoExperience extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'name'
    ];
}
