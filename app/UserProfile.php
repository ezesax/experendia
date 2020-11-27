<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProfile extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'user_id', 
        'zone_id', 
        'nationality_id', 
        'firstname', 
        'lastname', 
        'username', 
        'description', 
        'phone',
        'photo',
        'birthdate',
        'sex',
        'public'
    ];
}
