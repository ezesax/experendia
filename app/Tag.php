<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [

        'name',
        'slug',
        'description',
        'keywords',
        'icon',
        'image_default',
        'status'
    ];

    public function tag_type()
    {
        return $this->belongsToMany(TagType::class)->withTimestamps();
    }

}
