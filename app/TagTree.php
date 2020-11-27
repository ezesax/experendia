<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TagTree extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'tree',
        'branch',
        'level',
        'parent_id',
        'status'
    ];

    public function tags ()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }

    public function aliases ()
    {
        return $this->hasMany(TagAlias::class);
    }
}
