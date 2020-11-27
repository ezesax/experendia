<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoundingUser extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'user_id'
    ];
}
