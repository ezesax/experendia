<?php

namespace App\Http\Controllers\API;

use App\Http\Resources\UserResource;
use App\Http\Resources\UserProfileResource;
use App\User;
use App\UserProfile;
use App\UserPhotoProfileLog;
use App\UserInterest;
use App\UserKnowledge;
use App\UserStatusProfile;
use App\UserProfileDataValue;
use App\UserPointAction;
use App\UserLevel;
use App\LevelPoint;
use App\Point;
use App\UserAccessLog;
use App\UserAcountEventLog;
use App\FoundingUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\UrlGenerator;
use JWTAuth;
use Socialite;
use App\Http\Controllers\EmailController;

class FinalUserController extends Controller
{
    protected $EmailController;
    public function __construct(EmailController $EmailController)
    {
        $this->EmailController = $EmailController;
    }
    
    public function userLogin(Request $request){
        $input = $request->only('email', 'password');
        $jwt_token = null;

        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json(['message' => 'Unauthorized', 'login' => false], 401);
        }

        $user = User::with('profile', 'roles')->where('email', $input['email'])->get()->first();

        $this->generateUserAccessLogs($user->id, $request->useragent, 'login', $request->device);
        
        return  response()->json([
            'login' => true,
            'token' => $jwt_token,
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        if(
            !$this->validateUserData($request, true) || 
            !$this->validateProfileData($request)
        )
            throw new HttpResponseException(response()
            ->json('there are missing or incorrect fields', 400));
        
        //User creation
        $user = new User();
        $userName = $this->generateUserName($request->firstname, $request->lastname);
        $user->name         = $userName;
        $user->email        = $request->email;
        $user->password     = bcrypt($request->password);
        $user->facebookid   = null;
        $user->googleid     = null;
        $user->linkedinid   = null;
        $user->verified     = 0;
        $user->status       = $request->status;
        $user->remember_token = $this->generateRememberToken($user->email);
        $user->save();
        
        $user->assignRole('User');

        //User Profile Creation

        $profile = new UserProfile();
        $profile->user_id           = $user->id;
        $profile->nationality_id    = 0;
        $profile->zone_id           = $this->hasData($request->province) ? $request->province : $request->country;
        $profile->firstname         = $request->firstname;
        $profile->lastname          = $request->lastname;
        $profile->username          = $userName;
        $profile->public            = $request->isPublic;
        
        if(is_file($request->photo)){
            $image_name = 'IMAGES/PROFILE/'.time() .'.' . $request->photo->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($request->photo));
            $image_url = 'storage/'.$image_name;

            $profile->photo = $image_url;
        }else{
            $profile->photo = "" ;
        }

        if($request->origin != 'back'){
            if(FoundingUser::count() < env("FOUNDER_USERS", 100)){
                $fu = new FoundingUser();
                $fu->user_id = $user->id;
                $fu->save();
            }

            $this->createInterest($user->id, $request->interests);
            $this->createKnowledge($user->id, $request->knowledges);
        }

        if($this->hasData($request->nationality))
            $profile->nationality_id = $request->nationality;
        
        $this->createUserStatusProfile($user, $profile); //user_profile_data_values
        //$this->createUserPointAction($user->id, 'register'); //points
        $this->createLevel($user->id);

        $profile->save();

        $this->generateAccountLog($user->id, $request->useragent, 'add', $request->device);

        $this->generatePhotoHistory($user->id, $profile->photo);

        if($request->origin != 'back'){
            $urlConfirm = url()->to('/').'/confirm_register?id='.$user->id.'&remember_token='.$user->remember_token;
            $this->EmailController->sendConfirmationEmail($urlConfirm, $user->email);
        }

        return response()->json([
            'created' => true,
            'response' => ["user" => $user, "profile" => $profile]
        ], 201);
    }

    public function redirectToFacebook() {
        return Socialite::driver('facebook')->redirect();
    }

    public function redirectToGoogle() {
        return Socialite::driver('google')->redirect();
    }

    public function facebookRegister($data){
        $name = explode(" ", $data['name']);

        $user = User::where('email', $data['email'])->get();
        if(count($user) > 0){
            $user = $user->first();
            $user->facebookid = $user->facebookid == null ? $data['id'] : $user->facebookid;
            $user->save();

            if(!$jwt_token = JWTAuth::fromUser($user)){
                return response()->json(['login' => false, 'user' => $user], 401);
            }else{
                $this->generateUserAccessLogs($user->id, '', 'login', '');
                return response()->json(['login' => true, 'user' => $user, 'token' => $jwt_token], 200);
            }
        }

        $user = new User();
        $userName = $this->generateUserName($name[0], $name[1]);
        $user->name         = $userName;
        $user->email        = $data['email'];
        $user->password     = bcrypt('social');
        $user->facebookid   = $data['id'];
        $user->verified     = 1;
        $user->status       = 'Activo';
        $user->remember_token = $this->generateRememberToken($user->email);
        $user->save();
        $user->assignRole('User');
        $profile = new UserProfile();
        $profile->user_id           = $user->id;
        $profile->nationality_id    = 0;
        $profile->zone_id           = 1;
        $profile->firstname         = $name[0];
        $profile->lastname          = $name[1];
        $profile->username          = $userName;
        $profile->public            = 1;
        $profile->photo = "" ;
        $profile->save();

        if(FoundingUser::count() < env("FOUNDER_USERS", 100)){
            $fu = new FoundingUser();
            $fu->user_id = $user->id;
            $fu->save();
        }

        $this->createUserStatusProfile($user, $profile);
        $this->createLevel($user->id);

        $this->generateAccountLog($user->id, '', 'add', '');

        if(!$jwt_token = JWTAuth::fromUser($user)){
            return response()->json(['login' => false, 'user' => $user], 401);
        }else{
            $this->generateUserAccessLogs($user->id, '', 'login', '');
            return response()->json(['login' => true, 'user' => $user, 'token' => $jwt_token], 200);
        }

        return response()->json(['login' => true, 'user' => $user], 200);
    }

    public function googleRegister($data){

        $user = User::where('email', $data['email'])->get();

        if(count($user) > 0){
            $user = $user->first();
            $user->googleid = $user->googleid == null ? $data['id'] : $user->googleid;
            $user->save();

            if(!$jwt_token = JWTAuth::fromUser($user)){
                return response()->json(['login' => false, 'user' => $user], 401);
            }else{
                $this->generateUserAccessLogs($user->id, '', 'login', '');
                return response()->json(['login' => true, 'user' => $user, 'token' => $jwt_token], 200);
            }

            return response()->json(['login' => true, 'user' => $user], 200);
        }

        $user = new User();
        $userName = $this->generateUserName($data['given_name'], $data['family_name']);
        $user->name         = $userName;
        $user->email        = $data['email'];
        $user->password     = bcrypt('social');
        $user->googleid     = $data['id'];
        $user->verified     = 1;
        $user->status       = 'Activo';
        $user->remember_token = $this->generateRememberToken($user->email);
        $user->save();
        $user->assignRole('User');
        $profile = new UserProfile();
        $profile->user_id           = $user->id;
        $profile->nationality_id    = 0;
        $profile->zone_id           = 1; //QUE CARAJO HAGO CON ESTO
        $profile->firstname         = $data['given_name'];
        $profile->lastname          = $data['family_name'];
        $profile->username          = $userName;
        $profile->public            = 1;
        $profile->photo = "" ;
        $profile->save();

        if(FoundingUser::count() < env("FOUNDER_USERS", 100)){
            $fu = new FoundingUser();
            $fu->user_id = $user->id;
            $fu->save();
        }

        $this->createUserStatusProfile($user, $profile);
        $this->createLevel($user->id);

        $this->generateAccountLog($user->id, '', 'add', '');

        if(!$jwt_token = JWTAuth::fromUser($user)){
            return response()->json(['login' => false, 'user' => $user], 401);
        }else{
            $this->generateUserAccessLogs($user->id, '', 'login', '');
            return response()->json(['login' => true, 'user' => $user, 'token' => $jwt_token], 200);
        }

        return response()->json(['login' => true, 'user' => $user], 200);
    }

    public function checkUserEmail(Request $request){
        $user = User::where('email', $request->email)->get();

        if(count($user) > 0)
            return 'true';
        
        return 'false';
    }

    public function sendResetPasswordEmail(Request $request){
        $user = User::where('email', $request->email)->get()->first();

        $this->EmailController->sendResetPasswordEmail($user->id, $user->remember_token, $user->email);
    }

    public function updatePassword(Request $request){
        $user = User::where('id', $request->id)
                    ->where('remember_token', $request->remember_token)
                    ->get();
        
        if(count($user) == 0)
            return response()->json(['msg' => 'No user found'], 404);
        
        $user = $user->first();
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['msg' => 'password updated'], 200);
    }

    private function generatePhotoHistory($user_id, $photo_url){
        $photoHistory = new UserPhotoProfileLog();

        $photoHistory->user_id = $user_id;
        $photoHistory->photo = $photo_url;
        $photoHistory->action = 'add';

        $photoHistory->save();
    }

    private function generateUserName($firstname, $lastname){
        $userName = '';
        $count = 0;
        $continue = true;
        $firstname = mb_strtolower($firstname);
        $lastname = mb_strtolower($lastname);

        while($continue){
            if($count == 0){
                $userName = $firstname.'.'.$lastname;
                $exist = User::where('name', $userName)->exists();

                if(!$exist){
                    $continue = false;
                }
            }else{
                $random = mt_rand();
                $userName = $firstname.'.'.$lastname.'.'.$random;
                $exist = User::where('name', $userName)->exists();

                if(!$exist){
                    $continue = false;
                }
            }

            $count++;
        }

        return $userName;
    }

    private function validateUserData($userData, $passwordRequired){
        $pass = true;

        if(
            $userData->email == null        ||
            $userData->email == ""          ||
            $userData->status == null       ||
            $userData->status == ""
        )
            $pass = false;
        
        if($passwordRequired && ($userData->password == null || $userData->password == ""))
            $pass = false;

        return $pass;
    }

    private function validateProfileData($profileData){
        $pass = true;

        if(
            $profileData->firstname == null              ||
            $profileData->firstname == ""                ||
            $profileData->country == null                ||
            $profileData->country == ""                  ||
            ($profileData->isPublic != 0                 &&
            $profileData->isPublic != 1)
        )
            $pass = false;

        return $pass;
    }

    private function hasData($data){
        if($data != "undefined" && $data != null && $data != "null" && $data != "")
            return true;
        
        return false;
    }

    private function createInterest($userId, $interests){
        for($i = 0; $i < count($interests); $i++){
            $int = new UserInterest();

            $int->user_id = $userId;
            $int->tag_search_id = $interests[$i];

            $int->save();
        }
    }

    private function createKnowledge($userId, $knowledges){
        for($i = 0; $i < count($knowledges); $i++){
            $int = new UserKnowledge();

            $int->user_id = $userId;
            $int->tag_search_id = $knowledges[$i];

            $int->save();
        }
    }

    private function createUserPointAction($userId, $action){
        $userPoint = UserPointAction::where('user_id', $userId)->get();
        if(count($userPoint) == 0){
            $userPoint = new UserPointAction();

            $userPoint->user_id = $userId;
            $userPoint->register = 0;
            $userPoint->experiences_post = 0;
            $userPoint->response_experiences = 0;
            $userPoint->rate_experience = 0;
            $userPoint->delete_experience = 0;
            $userPoint->daily_access = 0;
            $userPoint->followers = 0;
            $userPoint->following = 0;
            $userPoint->breaches_rules = 0;
            $userPoint->account_lockout = 0;
            $userPoint->founder = 0;
            $userPoint->total_points = 0;
        }

        $point = Point::where('item', $action)->get();

        if(count($point) == 0)
            return;
        
        $point = $point->first();

        $userPoint[$action] += 1;
        $userPoint['total_points'] += $point->value;

        $userPoint->save();
    }

    private function createUserStatusProfile($user, $profile){
        if($this->hasData($profile->firstname))
            $this->createStatus('firstname', $user->id);

        if($this->hasData($profile->lastname))
            $this->createStatus('lastname', $user->id);

        if($this->hasData($profile->nationality_id) && $profile->nationality_id != 0)
            $this->createStatus('nationality', $user->id);

        if($this->hasData($profile->photo))
            $this->createStatus('photo_perfil', $user->id);

        if($this->hasData($profile->birthdate))
            $this->createStatus('date_birth', $user->id);

        if($this->hasData($profile->sex))
            $this->createStatus('sex', $user->id);

        if($this->hasData($user->email))
            $this->createStatus('email', $user->id);

        if($this->hasData($user->password))
            $this->createStatus('password', $user->id);

        if(count(UserInterest::where('user_id', $user->id)->get()) > 0)
            $this->createStatus('interests', $user->id);
        if(count(UserKnowledge::where('user_id', $user->id)->get()) > 0)
            $this->createStatus('knowledge', $user->id);

        if(count(FoundingUser::where('user_id', $user->id)->get()) > 0)
            $this->createStatus('founder', $user->id);
    }

    private function createStatus($item, $userId){
        $dataValue = UserProfileDataValue::where('item', $item)->get()->first();

        $userStatus = new UserStatusProfile();

        $userStatus->user_id = $userId;
        $userStatus->data_value_id = $dataValue->id;

        $userStatus->save();

        $userPoint = UserPointAction::where('user_id', $userId)->get();
        if(count($userPoint) == 0){
            $userPoint = new UserPointAction();

            $userPoint->user_id = $userId;
            $userPoint->register = 1;
            $userPoint->experiences_post = 0;
            $userPoint->response_experiences = 0;
            $userPoint->rate_experience = 0;
            $userPoint->delete_experience = 0;
            $userPoint->daily_access = 0;
            $userPoint->followers = 0;
            $userPoint->following = 0;
            $userPoint->breaches_rules = 0;
            $userPoint->account_lockout = 0;
            $userPoint->founder = 0;
            $userPoint->total_points = 0;
        }else{
            $userPoint = $userPoint->first();
        }

        $dataValue = UserProfileDataValue::where('item', $item)->get();

        if(count($dataValue) == 0)
            return;
        
        $dataValue = $dataValue->first();

        $userPoint['total_points'] += $dataValue->value;

        if($item == 'founder')
            $userPoint['founder'] = 1;

        $userPoint->save();
    }

    private function createLevel($userId){
        $points = UserPointAction::where('user_id', $userId)->get()->first();

        $level = $this->getHigherLevel(LevelPoint::where('points', '>', $points->total_points)->get());

        $userLevel = new UserLevel();

        $userLevel->user_id = $userId;
        $userLevel->level_point_id = $level;

        $userLevel->save();
    }

    private function getHigherLevel($levels){
        $lower = 9999;
        $id = 0;

        if(count($levels) == 0){
            return LevelPoint::max('level')->id;
        }

        for($i = 0; $i < count($levels); $i++){
            if($levels[$i]->level < $lower){
                $lower = $levels[$i]->level;
                $id = $levels[$i]->id;
            }
        }

        return $id;
    }

    private function generateAccountLog($userId, $userAgent, $action, $device){
        $log = new UserAcountEventLog();
        $device = $this->getDevice($device);

        $log->user_id = $userId;
        $log->device = $device;
        $log->ip = $this->getUserIP();
        $log->useragent = $userAgent;
        $log->action = $action;

        $log->save();
    }

    private function generateUserAccessLogs($userId, $userAgent, $action, $device){
        $log = new UserAccessLog();
        $device = $this->getDevice($device);

        $log->user_id = $userId;
        $log->device = $device;
        $log->ip = $this->getUserIP();
        $log->useragent = $userAgent;
        $log->action = $action;

        $log->save();
    }

    private function getDevice($device){
        if($device == 'tablet')
            return 2;
        
        if($device == 'mobile')
            return 1;
        
        if($device == 'desktop')
            return 3;
        
        return 0;
    }

    private function getUserIP()
    {
        // Get real visitor IP behind CloudFlare network
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
                $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
                $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP))
        {
            $ip = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP))
        {
            $ip = $forward;
        }
        else
        {
            $ip = $remote;
        }

        return $ip;
    }

    private function generateRememberToken($email){
        $token = bcrypt($email);

        if(strlen($token) <= 100)
            return $token;
        
        return substr($token, 0, 100);
    }
}
