<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendConfirmationEmail($urlConfirm, $email){
        //\Mail::to($email)->send(new \App\Mail\ConfirmationEmail($urlConfirm));
            return;
        //dd("Email is Sent.");
    }

    public function sendResetPasswordEmail($id, $token, $email){
        \Mail::to($email)->send(new \App\Mail\ResetPasswordEmail($id, $token));
       
        dd("Email is Sent.");
    }
}
