<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'id',
        'title',
        'description',
        'image',
        'video',
        'token',
        'slug',
        'status'
    ];

    public function user ()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function channel()
    {
        return $this->belongsTo(Channel::class, 'channel_id');
    }

    public function tag_search ()
    {
        return $this->belongsToMany(TagSearch::class)->withTimestamps();
    }

    public function images()
    {
        return $this->hasMany(ImageExperience::class);
    }

    public function videos()
    {
        return $this->hasMany(VideoExperience::class);
    }
}
