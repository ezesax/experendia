<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TagExperienceFilter extends Model
{
    use SoftDeletes;

    protected $fillable = [

        'id',
        'experience_id',
        'tag_id',
        'tag_search_id',
        'tag_tree_id'
    ];
}
