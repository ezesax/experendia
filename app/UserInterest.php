<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserInterest extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'user_id',
        'tag_search_id'
    ];
}
