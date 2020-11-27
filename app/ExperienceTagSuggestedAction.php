<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ExperienceTagSuggestedAction extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id',
        'tag_suggested_id',
        'experience_id',
        'action'
    ];
}
