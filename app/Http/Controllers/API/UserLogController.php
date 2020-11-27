<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\UserAcountEventLog;
use App\UserAccessLog;
use App\User;
use Illuminate\Support\Facades\Auth;

class UserLogController extends Controller
{
    public function createAccountEventLog(Request $request)
    {   
        $user = Auth::user();
        $data = $request->all();
        $data['user_id'] = $user->id;
        $data['ip'] = $this->getIp();

        $item = new UserAcountEventLog($data);
        $item->save();

        return response()->json(['log' => 'created'], 200);
    }

    public function createUserAccessLog(Request $request)
    {   
        $user = Auth::user();
        $data = $request->all();
        $data['user_id'] = $user->id;
        $data['ip'] = $this->getIp();

        $item = new UserAccessLog($data);
        $item->save();

        return response()->json(['log' => 'created'], 200);
    }

    private function getIp(){
        foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
            if (array_key_exists($key, $_SERVER) === true){
                foreach (explode(',', $_SERVER[$key]) as $ip){
                    $ip = trim($ip); // just to be safe
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                        return $ip;
                    }
                }
            }
        }
    }
}
