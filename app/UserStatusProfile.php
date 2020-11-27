<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserStatusProfile extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'user_id',
        'data_value_id'
    ];
}
