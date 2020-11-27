<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TagSearch extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [

        'branch_id',
        'tag',
        'tree',
        'status'
    ];

    public function tags_tree ()
    {
        return $this->belongsTo(TagTree::class, 'tag_tree_id');
    }
}
