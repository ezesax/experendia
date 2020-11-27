<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAcountEventLog extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'device',
        'ip',
        'useragent',
        'action',
    ];
}
