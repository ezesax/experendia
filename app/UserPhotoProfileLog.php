<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserPhotoProfileLog extends Model
{
    protected $fillable = [
        'user_id',
        'photo',
        'action'
    ];
}
