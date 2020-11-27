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
//use App\Http\Controllers\EmailController;

class UserController extends Controller
{
    //protected $EmailController;
    //public function __construct(EmailController $EmailController)
    //{
    //    $this->EmailController = $EmailController;
    //}
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $users = User::paginate(25);
        return response()->json(['response' => $users], 200);
    }

    public function getAllActiveUsers()
    {
        $users = User::where('status', 'Activo')
                    ->with('profile')
                    ->whereHas('roles', function(Builder $query){
                        $query->where('roles.name', 'User');
                    })
                    ->get();
        return response()->json(['response' => $users], 200);
    }

    /**
     * Display a listing of the resource with the asociated profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersWithProfiles(Request $request)
    {
        $perPage = $request->perPage == 'Todos' ? User::count() : $request->perPage;
        $users = User::withTrashed()->with('profile', 'roles')->paginate($perPage);
        return response()->json(['response' => $users], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
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
        
        if(isset($request->role)){
            $user->assignRole($request->role);
        }else{
            $user->assignRole('User');
        }

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

        //if(FoundingUser::count() < env("FOUNDER_USERS", 100)){
        //    $fu = new FoundingUser();
        //    $fu->user_id = $user->id;
        //    $fu->save();
        //}

        $profile->save();

        $this->generatePhotoHistory($user->id, $profile->photo);

        //$urlConfirm = url()->to('/').'/confirm_register?id='.$user->id.'&remember_token='.$user->remember_token;
        //$this->EmailController->sendConfirmationEmail($urlConfirm, $user->email);

        return response()->json([
            'created' => true,
            'response' => ["user" => $user, "profile" => $profile]
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($user)
    {
        $item = User::findOrFail($user);

        return response()->json([
            'created' => true,
            'response' => new UserResource($item)
        ], 200);
    }

    public function showWithProfile($id)
    {
        $user = User::with('profile')
                    ->where('id', $id)
                    ->get();

        return response()->json([
            'created' => true,
            'response' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $user)
    {
        if(
            !$this->validateUserData($request, false) || 
            !$this->validateProfileData($request)
        )
            throw new HttpResponseException(response()
            ->json('there are missing or incorrect fields', 400));
        
        //User update
        $user = User::withTrashed()->findOrFail($user);

        if($request->status == 'Eliminado'){
            $user->status       = $request->status;
            $user->save();
            $user->delete();

            return response()->json([
                'deleted' => true
            ], 201);
        }else{
            $user->deleted_at = null;
        }

        $profile = UserProfile::where('user_id', $user->id)->first();

        $userName = $user->name;

        if($profile->firstname != $request->firstname 
        || $profile->lastname != $request->lastname)
            $userName = $this->generateUserName($request->firstname, $request->lastname);

        $user->name         = $userName;
        $user->email        = $request->email;
        $user->facebookid   = null;
        $user->googleid     = null;
        $user->linkedinid   = null;
        $user->verified     = 0;
        $user->status       = $request->status;
        $user->save();

        $user->syncRoles([$request->role]);

        //User Profile update

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

            $this->generatePhotoHistory($user->id, $profile->photo);
        }

        $profile->save();

        return response()->json([
            'updated' => true,
            'response' => ["user" => $user, "profile" => $profile]
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($user)
    {
        $item = User::findOrFail($user);
        $item->profile()->detach();
        $item->delete();
        return response()->json([], 204);
    }

    public function changePassword(Request $request){
        $user = User::findOrFail($request->user);
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['response' => 'updated'], 201);
    }

    public function getRoles()
    {
        $roles = Role::all();

        return response()->json(['response' => $roles], 200);
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
