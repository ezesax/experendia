<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TagAlias extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [

        'name',
        'alias',
        'status',
    ];

    public function tag_tree ()
    {
        return $this->belongsTo(TagTree::class, 'tag_tree_id');
    }
}
