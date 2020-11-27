<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExperiencesUsersCrawler extends Model
{
    use SoftDeletes;

    protected $fillable = [

        'id',
        'zone_id',
        'experience_id',
        'firstname',
        'lastname',
        'photo',
        'email',
        'referrer_url'
    ];
}
