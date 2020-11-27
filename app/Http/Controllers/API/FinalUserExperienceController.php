<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Experience;
use App\ImageExperience;
use App\VideoExperience;
use App\ExperienceFilter;
use App\ExperienceTagSuggested;
use App\ExperienceTagSuggestedAction;
use App\ExperienceTagSuggestedUser;
use App\ExperienceUserLog;
use App\User;
use App\UserProfile;
use App\Tag;
use App\TagSearch;
use App\TagAlias;
use App\TagTree;
use App\TagExperiences;
use App\TagExperienceFilter;
use App\UserLevel;
use App\LevelPoint;
use App\Zone;
use App\Helpers\ImageManipulator;
use DOMDocument;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class FinalUserExperienceController extends Controller
{
    public function uploadMainPhoto(Request $request){
        $data = $request->all();

        if(is_file($data['image'])){
            $image_name = 'IMAGES/EXPERIENCES/TEMP/'.$data['path'].'/'.time() .'.' . $data['image']->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($data['image']));
            $image_url = 'storage/'.$image_name;

            return response()->json(['upload' => 'success', 'path' => $image_url]);
        }

        return response()->json(['upload' => 'failed'], 400);
    }

    public function deleteMainPhoto(Request $request){
        $path = explode("storage/", $request->path)[1];
        Storage::disk('public')->delete($path);
        return response()->json(['deleted' => 'success'], 200);
    }

    public function experienceBodyImageUpload(Request $request){
        $data = $request->all();
        if(is_file($data['upload'])){
            $image_name = 'IMAGES/EXPERIENCES/TEMP/'.$data['path'].'/'.time() .'.' . $data['upload']->getClientOriginalExtension();
            Storage::disk('public')->put($image_name, \File::get($data['upload']));
            $image_url = 'storage/'.$image_name;

            return response()->json(['uploaded' => true, 'url' => $image_url]);
        }

        return response()->json(['uploaded' => false, 'error' => ['message' => 'could not upload this image']]);
    }

    public function getFiveMoreSeen(Request $request){
        //TODO: Obtener las cinco experiencias más vistas
        if($request->tag > 0){
            $experiencesIds = TagExperienceFilter::select('experience_id')
                                                 ->where('tag_id', $request->tag)
                                                 ->get();
            $ids = ExperienceFilter::select('experience_id')
                                   ->where('channel_id', $request->id)
                                   ->whereIn('experience_id', $experiencesIds)
                                   ->orderBy('hits', 'desc')
                                   ->take('5')
                                   ->get();
        }else{
            $ids = ExperienceFilter::select('experience_id')
                                   ->where('channel_id', $request->id)
                                   ->orderBy('hits', 'desc')
                                   ->take('5')
                                   ->get();
        }

        $exp = Experience::whereIn('id', $ids)->get();

        foreach($exp as $e){
            $tagId = TagExperienceFilter::where('experience_id', $e->id)->get()->first()->tag_id;
            $tagName = Tag::findOrFail($tagId)->name;
            $userPriofile = UserProfile::where('user_id', $e->user_id)->get()->first();
            $userFullName = $userPriofile->firstname.' '.$userPriofile->lastname;
            $zone = Zone::findOrFail($userPriofile->zone_id);

            $e->rootTag = $tagName;
            $e->userFullName = $userFullName;
            $e->zone = $zone->name;
        }

        return response()->json(['response' => $exp]);
    }

    public function getOrderedExperiences(Request $request){
        //TODO: Obtener un listado paginado de a 5 con las experiencias
        //      ordenadas de mas recientes a menos recientes
        if($request->tag > 0){
            $experiencesIds = TagExperienceFilter::select('experience_id')
                                                 ->where('tag_id', $request->tag)
                                                 ->get();
            $exp = Experience::orderBy('created_at', 'desc')
                             ->where('channel_id', $request->id)
                             ->whereIn('id', $experiencesIds)
                             ->paginate(5);    
        }else{
            $exp = Experience::orderBy('created_at', 'desc')
                             ->where('channel_id', $request->id)
                             ->paginate(5);
        }

        foreach($exp as $e){
            $tagId = TagExperienceFilter::where('experience_id', $e->id)->get();
            $tagId = $tagId->first()->tag_id;
            $tagName = Tag::findOrFail($tagId)->name;
            $userPriofile = UserProfile::where('user_id', $e->user_id)->get()->first();
            $userFullName = $userPriofile->firstname.' '.$userPriofile->lastname;
            $zone = Zone::findOrFail($userPriofile->zone_id);
            $seen = 12;// ExperienceFilter::where('experience_id', $e->id)->get()->first()->hits;

            $e->rootTag = $tagName;
            $e->userFullName = $userFullName;
            $e->zone = $zone->name;
            $e->seen = $seen;
        }

        return response()->json(['response' => $exp]);
    }

    public function saveExperience(Request $request){
        $data = $request->all();
        $data['tags'] = explode(",", $data['tags']);
        $data['suggested_tags'] = explode(",", $data['suggested_tags']);

        $errors = $this->validateExperience($data);

        if(is_array($errors)){
            if(count($errors))
                return response()->json(['errors' => $errors], 400);
        }
        
        $user = Auth::user();
        $experience = new Experience();

        $image_name = 'IMAGES/EXPERIENCES/'.date("Y-m-d").'/'.time() .'.' . $data['image']->getClientOriginalExtension();
        Storage::disk('public')->put($image_name, \File::get($data['image']));
        $image_url = 'storage/'.$image_name;
        $image = new ImageExperience();
        $imageSize = getimagesize($image_url);

        $image->name = $image_url;
        $image->main = 1;
        $image->width = $imageSize[0];
        $image->height = $imageSize[1];

        $experience['title'] = $data['title'];
        $experience['description'] = $data['experience'];
        $experience->image = $image_url;
        $experience['video'] = $data['video'];
        $experience['token'] = Str::uuid()->toString();
        $experience['slug'] = strtolower(str_replace(" ", "-", $data['title']));
        $experience['status'] = 1;
        //$experience->user()->associate($user);
        $experience['user_id'] = $user == null ? 1 : $user->id;
        $experience->channel()->associate($data['channel']);

        $experience['description'] = str_replace('<figure class="image">', '', $experience['description']);
        $experience['description'] = str_replace('</figure>', '', $experience['description']);

        $experience->save();

        $experience->images()->save($image);

        $this->crop($image_url);

        $dom = new DOMDocument();
        @$dom->loadHTML($data['experience']);
        $bodyImages = $dom->getElementsByTagName('img');

        if($bodyImages){
            foreach($bodyImages as $img){
                $src = $img->getAttribute('src');
                $extension = explode(".", $src);
                $extension = $extension[(count($extension)-1)];
                $newPath = 'IMAGES/EXPERIENCES/'.date("Y-m-d").'/'.time() .'.' . $extension;

                Storage::disk('public')->move(explode("storage/", $src)[1], $newPath);
                $newPath = 'storage/'.$newPath;

                $ie = new ImageExperience();

                $ieSize = getimagesize($newPath);

                $ie->name = $newPath;
                $ie->main = 0;
                $ie->width = $ieSize[0];
                $ie->height = $ieSize[1];

                $experience->images()->save($ie);

                $experience['description'] = str_replace($src, $newPath, $experience['description']);
            }
        }

        $experience->save();

        if(count($data['tags']) > 0)
            $experience->tag_search()->syncWithoutDetaching($data['tags']);
        
        if(count($data['suggested_tags']) > 0){
            foreach($data['suggested_tags'] as $tag){
                $tagSuggested = ExperienceTagSuggested::where('tag', $tag)->get();

                if(count($tagSuggested) > 0){
                    $tagSuggested = $tagSuggested->first();
                }else{
                    $tagSuggested = new ExperienceTagSuggested();
                    $tagSuggested->tag = $tag;
                    $tagSuggested->save();
                }

                $tagSuggestedUser = new ExperienceTagSuggestedUser();
                $tagSuggestedUser['experience_id'] = $experience->id;
                $tagSuggestedUser['user_id'] = $user == null ? 1 : $user->id;
                $tagSuggestedUser['tag_suggested_id'] = $tagSuggested->id;
                $tagSuggestedUser->save();
            }
        }

        $tagsIds = [];
        $tagsSearchsIds = [];
        
        foreach($data['tags'] as $t){
            $ts = TagSearch::findOrFail($t);
            $tt = TagTree::findOrFail($ts['tag_tree_id']);
            $ta = TagAlias::where('tag_tree_id', $tt['id'])->get();
            $tag = Tag::findOrFail($tt['tag_id']);

            $this->generateTagExperienceRegister($data['channel'], $t, $tt['tag_id'], $tag->name);

            array_push($tagsIds, $tt['tag_id']);
            array_push($tagsSearchsIds, $ts['id']);

            $tagExperienceFilter = new TagExperienceFilter();
            $tagExperienceFilter->experience_id = $experience['id'];
            $tagExperienceFilter->tag_id = $tag['id'];
            $tagExperienceFilter->tag_search_id = $ts['id'];
            $tagExperienceFilter->tag_tree_id = $tt['id'];
            $tagExperienceFilter->save();
        }

        $tagAliases = $this->getAllAliases($data['tags']);

        $userId = $user == null ? 1 : $user->id;
        $userLevel = UserLevel::where('user_id', $userId)->get()->first();
        $levelPoint = LevelPoint::findOrFail($userLevel['level_point_id']);

        $experienceFilter = new ExperienceFilter();
        $experienceFilter['title'] = $experience['title'];
        $experienceFilter['description'] = $experience['description'];
        $experienceFilter['tag_aliases'] = implode (", ", $tagAliases);
        $experienceFilter['channel_id'] = $data['channel'];
        $experienceFilter['experience_id'] = $experience['id'];
        $experienceFilter['tag_search_id'] = $tagsSearchsIds[0];
        $experienceFilter['tag_id'] = $tagsIds[0];
        $experienceFilter['rating'] = 0;
        $experienceFilter['hits'] = 0;
        $experienceFilter['userLevel'] = $levelPoint['level'];
        $experienceFilter->save();

        $experienceUserLog = new ExperienceUserLog();
        $experienceUserLog['experience_id'] = $experience->id;
        $experienceUserLog['user_id'] = $user == null ? 1 : $user->id;
        $experienceUserLog['device'] = $this->getDevice($data['device']);
        $experienceUserLog['ip'] = $this->getUserIP();
        $experienceUserLog['action'] = 'add';
        $experienceUserLog['useragent'] = $data['useragent'];
        $experienceUserLog->save();

        $this->deleteDirectory('storage/IMAGES/EXPERIENCES/TEMP/'.$data['path']);

        return response()->json(['saved' => true], 200);
    }

    private function getAllAliases($tagsIds){
        $result = [];

        foreach($tagsIds as $t){
            $continue = true;
            $tag = $t;

            while($continue){
                $ts = TagSearch::findOrFail($tag);
                $tt = TagTree::findOrFail($ts['tag_tree_id']);
                $ta = TagAlias::where('tag_tree_id', $tt['id'])->get();
                $tagName = Tag::findOrFail($tt->tag_id)->name;

                array_push($result, $tagName);
                if(count($ta) > 0){
                    foreach($ta as $alias){
                        array_push($result, $alias['name']);
                    }
                }

                if($tt->parent_id != null){
                    $parentTtId = TagTree::findOrFail($tt['parent_id'])->id;
                    $tag = TagSearch::where('tag_tree_id', $parentTtId)->get()->first()->id;
                }else{
                    $continue = false;
                }
            }
        }

        return array_unique($result);
    }

    private function generateTagExperienceRegister($channelId, $tagSearchId, $tagId, $tagName){
        $te = TagExperiences::where('channel_id', $channelId)
                            ->where('tag_search_id', $tagSearchId)
                            ->where('tag_id', $tagId)
                            ->get();
        
        if(count($te) > 0){
            $te = $te->first();
        }else{
            $te = new TagExperiences();

            $te['channel_id'] = $channelId;
            $te['tag_search_id'] = $tagSearchId;
            $te['tag_root_id'] = $tagId;
            $te['tag_id'] = $tagId;
            $te['tag'] = $tagName;
            $te['hits'] = 0;
        }

        $te['hits'] += 1;

        $te->save();
    }

    private function validateExperience($data){
        $errors = [];
        $tags = 0;

        if(!$this->hasData($data['channel']))
            array_push($errors, '#invalid-channel');

        if(!$this->hasData($data['title']))
            array_push($errors, '#invalid-title');

        if(!$this->hasData($data['experience']))
            array_push($errors, '#invalid-experienceBody');

        if(!$this->hasData($data['image']))
            array_push($errors, '#invalid-file-input');

        if(is_array($data['tags'])){
            $tags += count($data['tags']);
        }

        if(is_array($data['suggested_tags'])){
            $tags += count($data['suggested_tags']);
        }

        if($tags < 3)
            array_push($errors, '#invalid-tags');

        return $errors;
    }

    private function crop($path){
        $im = new ImageManipulator($path);
        $centreX = round($im->getWidth() / 2);
        $centreY = round($im->getHeight() / 2);

        $x1 = $centreX - 70;
        $y1 = $centreY - 45;

        $x2 = $centreX + 70;
        $y2 = $centreY + 45;

        $newPath = explode(".", $path);
        $extension = $newPath[count($newPath)-1];
        array_pop($newPath);
        $newPath = implode("", $newPath).'-140x90.'.$extension;

        $im->crop($x1, $y1, $x2, $y2);
        $im->save($newPath);
    }

    private function hasData($data){
        if($data != "undefined" && $data != null && $data != "null" && $data != "")
            return true;
        
        return false;
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

    private function deleteDirectory($dir) {
        if (!file_exists($dir)) {
            return true;
        }
    
        if (!is_dir($dir)) {
            return unlink($dir);
        }
    
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
    
            if (!$this->deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
    
        }
    
        return rmdir($dir);
    }
}
