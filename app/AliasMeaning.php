<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AliasMeaning extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'alias'
    ];
    public function tag ()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }

    public function tree ()
    {
        return $this->belongsTo(TagTree::class, 'tag_tree_id');
    }
}
