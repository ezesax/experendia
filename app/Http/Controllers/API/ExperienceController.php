<?php

namespace App\Http\Controllers\API;

use App\Experience;
use App\ExperiencesUsersCrawler;
use App\Http\Requests\CreateExperienceRequest;
use App\Http\Requests\EditExperienceRequest;
use App\Http\Resources\ExperienceResource;
use App\ImageExperience;
use App\VideoExperience;
use App\TagSearch;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DOMDocument;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        //$user = Auth::user();
        //return ExperienceResource::collection(
        //    Experience::where('user_id', $user->id)->get()
        //);
        
        $user = Auth::user();
        $perPage = $request->perPage == 'Todos' ? Experience::count() : $request->perPage;

        if($user->hasRole(['Admin'])){
            $experiences = Experience::with('user', 'tag_search')
            ->paginate($perPage);
        }else{
            $experiences = Experience::with('user', 'tag_search')
            ->where('user_id', $user->id)
            ->paginate($perPage);
        }

        return response()->json(['response' => $experiences], 200);
    }

    /**
     * Display a listing of the resource with the asociated profile.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    //public function getExperiencesList(){
    //    $user = Auth::user();
    //    return Experience::where('user_id', $user->id)->get();
    //    //$perPage = $request->perPage == 'Todos' ? Experience::count() : $request->perPage;
    //    //$experiences = Experience::paginate($perPage)->pluck('id', 'title', 'status', 'created_at', 'user_id');
    //    //return response()->json(['response' => 'trulala'], 200);
    //}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateExperienceRequest $request)
    {
        $data = $request->validated();

        if(isset($data['owner'])){
            if($data['owner'] > 0){
                $user = User::findOrFail($data['owner']);
            }else{
                $user = Auth::user();
            }
        }else{
            $user = Auth::user();
        }

        $item = new Experience($data);

        $item->slug = strtolower(str_replace(" ", "-", $data['title']));
        $item->token = Str::uuid()->toString();
        $item->user()->associate($user);
        $item->channel()->associate($data['channel']);

        $item->save();

        $item->tag_search()->syncWithoutDetaching($data['tag_search']);

        if(is_file($data['image'])){
            $image_name = 'IMAGES/EXPERIENCES/'.date("Y-m").'/'.time() .'.' . $data['image']->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($data['image']));
            $image_url = 'storage/'.$image_name;
            $image = new ImageExperience();

            $imageSize = getimagesize($image_url);

            $image->name = $image_url;
            $image->main = 1;
            $image->width = $imageSize[0];
            $image->height = $imageSize[1];

            $item->images()->save($image);
            $item->image = $image_url;
        }else{
            $item->image = "" ;
        }

        $dom = new DOMDocument();
        $dom->loadHTML($item->description);
        $images = $dom->getElementsByTagName('img');

        if($images){
            foreach($images as $img){
                $src = $img->getAttribute('src');
                $ie = new ImageExperience();

                $imageSize = getimagesize($src);

                $ie->name = $src;
                $ie->main = 0;
                $ie->width = $imageSize[0];
                $ie->height = $imageSize[1];

                $item->images()->save($ie);
            }
        }

        if($this->hasData($data['video'])){
            $video = new VideoExperience(['name' => $data['video']]);
            $item->videos()->save($video);
            $item->video = $data['video'];
        }else{
            $item->video = "";
        }

        if($this->hasCrawlerData($request))
            $this->createCrawlerProfile($request, $item->id);
        
        $item->save();

        return response()->json([
            'created'   => true,
            'response' => new ExperienceResource($item)
        ], 201);
    }

    public function saveExperienceImage(Request $request)
    {
        $img = $request->image;
        $request->title = $this->hasData($request->title) ? $request->title : '';

        $request->title = $this->cleanString($request->title);

        $image_name = 'IMAGES/EXPERIENCES/'.date("Y-m").'/'.time().$request->title.'.'.$img->getClientOriginalExtension();
        Storage::disk('public')->put($image_name, \File::get($img));

        return response()->json(['url' => 'storage/'.$image_name], 200);
    }

    public function deleteExperienceImage(Request $request)
    {
        $this->deleteImage($request->path);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($experience)
    {
        //
        $item = Experience::findOrFail($experience);
        $item->load('user', 'tag_search', 'videos', 'images');

        return response()->json([
            'created'   => true,
            'response'  => new ExperienceResource($item)
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        
        $item = Experience::findOrFail($id);

        if($data['owner'] != $item->user_id){
            if($data['owner'] == 0){
                $user = Auth::user();
            }else{
                $user = User::findOrFail($data['owner']);
            }

            $item->user()->associate($user);
        }

        $result = ImageExperience::where('experience_id', $id)->where('main', 0)->get();
        $oldImages = [];

        foreach($result as $img){
            array_push($oldImages, $img->name);
        }

        $item->slug = strtolower(str_replace(" ", "-", $data['title']));
        $item->token = Str::uuid()->toString();
        $item->channel_id = $data['channel'];

        $item->tag_search()->detach();
        $item->tag_search()->syncWithoutDetaching($data['tag_search']);

        if(is_file($data['image'])){
            $image_name = 'IMAGES/EXPERIENCES/'.date("Y-m").'/'.time() .'.' . $data['image']->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($data['image']));
            $image_url = 'storage/'.$image_name;
            $image = new ImageExperience();

            $imageSize = getimagesize($image_url);

            $image->name = $image_url;
            $image->main = 1;
            $image->width = $imageSize[0];
            $image->height = $imageSize[1];

            $image->name = $image_url;
            $image->main = 1;

            $oldMainImage = ImageExperience::where('experience_id', $id)->where('main', 1)->get();
            ImageExperience::where('experience_id', $id)->where('main', 1)->delete();
            //$this->deleteImage($oldMainImage->first()->name);

            $item->images()->save($image);
            $item->image = $image_url;
        }else{
            $item->image = "" ;
        }

        $item->description = $data['description'];

        $dom = new DOMDocument();
        $dom->loadHTML($item->description);
        $images = $dom->getElementsByTagName('img');
        $newImages = [];

        if($images){
            foreach($images as $img){
                $src = $img->getAttribute('src');
                $ie = new ImageExperience();

                array_push($newImages, $src);

                if(!in_array($src, $oldImages)){
                    $imageSize = getimagesize('storage/'.explode("storage/", $src)[1]);

                    $ie->name = $src;
                    $ie->main = 0;
                    $ie->width = $imageSize[0];
                    $ie->height = $imageSize[1];

                    $item->images()->save($ie);
                }
            }
        }

        for($i = 0; $i < count($oldImages); $i++){
            if(!in_array($oldImages[$i], $newImages)){
                //$this->deleteImage($oldImages[$i]);

                ImageExperience::where('experience_id', $id)
                ->where('name', $oldImages[$i])
                ->delete();
            }
        }

        if($this->hasData($data['video'])){
            $videoExist = VideoExperience::where('experience_id', $id)
                        ->where('name', $data['video'])
                        ->count();
            
            if(!$videoExist){
                VideoExperience::where('experience_id', $id)->delete();
                $video = new VideoExperience();
                $video->name = $data['video'];
                $item->videos()->save($video);
                $item->video = $data['video'];
            }
        }else{
            $item->video = "";
        }

        $item->title = $data['title'];
        $item->status = $data['status'];
        
        $item->save();

        if($this->hasCrawlerData($request))
            $this->createCrawlerProfile($request, $item->id);

        return response()->json([
            'updated'   => true,
            'response' => new ExperienceResource($item)
        ], 201);
    }

    public function getCrawlerData(Request $request)
    {
        $userCrawler = ExperiencesUsersCrawler::where('experience_id', $request->id)->get();

        if(count($userCrawler) == 0)
            return response()->json(['user' => false], 200);
        

        return response()->json(['user' => $userCrawler->first()], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function hasData($data){
        if($data != "undefined" && $data != null && $data != "null" && $data != "")
            return true;
        
        return false;
    }

    private function cleanString($string) {
        $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
     
        return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
     }

    private function deleteImage($path)
    {
        $path = explode("storage/", $path)[1];
        Storage::disk('public')->delete($path);
    }

    private function hasCrawlerData($data){
        if(isset($data->userFirstname)
            || isset($data->userLastname)
            || isset($data->userEmail)
            || isset($data->userUrlReference)
            || isset($data->userZone)
        )
            return true;

        return false;
    }

    private function createCrawlerProfile($data, $experienceId){
        $update = false;
        if(isset($data['userId'])){
            if($data['userId'] > 0){
                $item = ExperiencesUsersCrawler::findOrFail($data['userId']);
                $update = true;
            }else{
                $item = new ExperiencesUsersCrawler();
            }
        }else{
            $item = new ExperiencesUsersCrawler();
        }

        if(is_file($data['userProfilePicture'])){
            if($update == true){
                $this->deleteImage($item->photo);
            }
            $image_name = 'IMAGES/PROFILE/'.date("Y-m").'/'.time() .'.' . $data['userProfilePicture']->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($data['userProfilePicture']));
            $image_url = asset('storage/'.$image_name);
            $item->photo = $image_url;
        }else{
            if($update == false){
                $item->photo = null;
            }
        }

        $item->zone_id = $this->hasData($data->userZone) ? $data->userZone : null;
        $item->experience_id = $experienceId;
        $item->firstname = $this->hasData($data->userFirstname) ? $data->userFirstname : null;
        $item->lastname = $this->hasData($data->userLastname) ? $data->userLastname : null;
        $item->email = $this->hasData($data->userEmail) ? $data->userEmail : null;
        $item->referrer_url = $this->hasData($data->userUrlReference) ? $data->userUrlReference : null;

        $item->save();
    }
}
