<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, SparkPost and others. This file provides a sane default
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'facebook' => [
        'client_id' => '363032501747531',
        'client_secret' => '97e45411fba21fd523c197dedd652370',
        'redirect' => 'http://dev.experendia.com/callback/facebook',
      ],

      'google' => [
        'client_id' => '808527131700-7v0eorb01mf5r75m7r58mgd8r06k65oa.apps.googleusercontent.com',
        'client_secret' => 'ds8FnujKx3ePbDbGNJiw39hi',
        'redirect' => 'http://dev.experendia.com/callback/google',
    ],

];
