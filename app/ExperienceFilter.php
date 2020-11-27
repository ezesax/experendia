<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExperienceFilter extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'title',
        'description',
        'tag_aliases',
        'channel_id',
        'experience_id',
        'tag_search_id',
        'tag_id',
        'rating',
        'hits',
        'userLevel'
    ];
}
