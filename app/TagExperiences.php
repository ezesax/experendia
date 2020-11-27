<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TagExperiences extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'id',
        'channel_id',
        'tag_search_id',
        'tag_root_id',
        'tag_id',
        'tag',
        'hits'
    ];
}
