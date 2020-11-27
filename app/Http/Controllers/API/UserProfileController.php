<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\EditUserProfileRequest;
use App\Http\Resources\UserProfileResource;
use App\UserProfile;
use App\UserPhotoProfileLog;

class UserProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profiles = UserProfile::all();
        return response()->json(['response' => $profiles], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EditUserProfileRequest $request)
    {
        //No store function aviable
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $item = UserProfile::where('user_id', $user)->get()->first();

        return response()->json([
            'created' => true,
            'response' => new UserProfileResource($item)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EditUserProfileRequest $request, $id)
    {
        if(!$this->validateProfileData($request))
            throw new HttpResponseException(response()
            ->json('there are missing or incorrect fields', 400));

        $profile = UserProfile::where('user_id', $id)->get()->first();

        $profile->nationality_id    = $request->nationality_id;
        $profile->zone_id           = $request->zone_id;
        $profile->firstname         = $request->firstname;
        $profile->lastname          = $request->lastname;
        $profile->username          = $userName;
        $profile->description       = $request->description;
        $profile->phone             = $request->phone;
        $profile->birthdate         = $request->birthdate;
        $profile->sex               = $request->sex;
        $profile->public            = $request->public;
        $profile->status            = $request->status;

        $profile->save();

        return response()->json([
            'created' => true,
            'response' => new UserProfileResource($profile)
        ], 201);
    }

    public function updateProfilePicture(Request $request)
    {
        $profile = UserProfile::where('user_id', $request->id)->get()->first();
        $this->generatePhotoHistory($request->id, $profile->photo, 'del');

        $image_name = time() .'.' . $request->photo->getClientOriginalExtension();
        Storage::disk('local')->put('IMAGES/PROFILES/'.$image_name, \File::get($request->photo));
        $image_url = Storage::disk('local')->url('IMAGES/PROFILES/'.$image_name);
        $profile->photo = $image_url;
        $this->generatePhotoHistory($request->id, $image_url, 'add');

        $profile->save();

        return response()->json([
            'created' => true,
            'response' => new UserProfileResource($profile)
        ], 201);        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user)
    {
        $item = UserProfile::where('user_id', $user)->get()->first();
        $item->delete();
        return response()->json([], 204);

        //TODO: Eliminar tambien el usuario relacionado a este perfil
    }

    private function generatePhotoHistory($user_id, $photo_url, $action){
        $photoHistory = new UserPhotoProfileLog();

        $photoHistory->user_id = $user_id;
        $photoHistory->photo = $photo_url;
        $photoHistory->action = $action;

        $photoHistory->save();
    }

    private function validateProfileData($profileData){
        $pass = true;

        if(
            $profileData->firstname == null              ||
            $profileData->firstname == ""                ||
            $profileData->nationality_id == null         ||
            $profileData->nationality_id == ""           ||
            $profileData->public == null                 ||
            $profileData->public == ""
        )
            $pass = false;

        return $pass;
    }
}
