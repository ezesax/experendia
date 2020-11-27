<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExperienceUserLog extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'experience_id',
        'user_id',
        'device',
        'ip',
        'action',
        'useragent'

    ];
}
