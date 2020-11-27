<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Channel;
use App\Tag;
use App\Http\Controllers\API\FinalUserController;
use Socialite;

class PageController extends Controller
{
    protected $UserController;
    public function __construct(FinalUserController $UserController)
    {
        $this->UserController = $UserController;
    }

    public function getLoginView(){
        return view('ui.login');
    }

    public function getRegisterView(){
        return view('ui.register');
    }

    public function getConfirmationEmailView(){
        return view('ui.send_expe_2');
    }

    public function getConfirmedAccountView(Request $request){
        $user = User::where('id', $request->id)->where('remember_token', $request->remember_token)->get();
        if(count($user) > 0){
            $user = $user->first();
            $user->verified = 1;
            $user->save;

            return view('ui.send_expe_4');
        }
    }

    public function callBackFacebook(Request $request){
        $data = Socialite::driver('facebook')->stateless()->user();
        $this->UserController->facebookRegister($data);

        //retornar alguna vista
    }

    public function callBackGoogle(Request $request){
        $data = Socialite::driver('google')->stateless()->user();
        $this->UserController->googleRegister($data);

        //retornar alguna vista
    }

    public function getResetPasswordEmailSentView(){
        return view('ui.send_login');
    }

    public function getRecoverPassView(Request $request){
        return view('ui.reset_password')->with('id', $request->id)->with('remember_token', $request->remember_token);
    }

    public function getExperiencePublishView(){
        return view('ui.express_yourself');
    }

    public function getExperiencePublishSuccess(){
        return view('ui.send_expe_1');
    }

    public function getHomeChannel($channelSlug){
        $channel = Channel::select('id', 'slug')->where('slug', $channelSlug)->get()->first();
        if(!empty($channel)){
            return view('ui.index')->with('channelId', $channel->id)->with('tag', 0)->with('channelName', $channel->slug);
        }
    }

    public function getExperiencesByChannelAndTag($channelSlug, $tag){
        $channel = Channel::select('id', 'slug')->where('slug', $channelSlug)->get()->first();
        $tag = Tag::select('id')->where('slug', $tag)->get()->first();

        if(!empty($channel)){
            if(!empty($tag))
                return view('ui.index')->with('channelId', $channel->id)->with('tag', $tag->id)->with('channelName', $channel->slug);
            
                return view('ui.index')->with('channelId', $channel->id)->with('tag', 0);
        }
    }
}
