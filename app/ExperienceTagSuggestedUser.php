<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExperienceTagSuggestedUser extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'experience_id',
        'user_id',
        'tag_suggested_id'
    ];
}
