<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserPointAction extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'user_id',
        'register',
        'experiences_post',
        'response_experiences',
        'rate_experience',
        'delete_experience',
        'daily_access',
        'followers',
        'following',
        'breaches_rules',
        'account_lockout',
        'founder',
        'total_points'
    ];
}
