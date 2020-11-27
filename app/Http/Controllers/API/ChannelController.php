<?php

namespace App\Http\Controllers\API;

use App\Channel;
use App\Http\Requests\CreateChannelRequest;
use App\Http\Requests\EditChannelRequest;
use App\Http\Resources\ChannelResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\BuildTreeJob;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        //
        $channelTree = BuildTreeJob::dispatchNow(Channel::where('status', '<>', 'Eliminado')->get()->toArray());
        return response()->json(['response' => $channelTree], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateChannelRequest $request)
    {
        //
        $data = $request->validated();
        $item = new Channel($data);
        $item->slug = strtolower($data['name']);
        $item->save();

        return response()->json([
            'created'   => true,
            'response'  => new ChannelResource($item)
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($channel)
    {
        //
        $item = Channel::findOrFail($channel);

        return response()->json([
            'response' => new ChannelResource($item)
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditChannelRequest $request, $channel)
    {
        //
        $data = $request->validated();
        $data['slug'] = strtolower($data['name']);
        $item = Channel::findOrFail($channel);
        $item->update($data);

        return response()->json([
            'edited'    => true,
            'response'  => new ChannelResource($item)
        ], 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Channel::findOrFail($id);
        $item->delete();
        return response()->json([], 204);
    }

    public function getChannelsList()
    {
        $channels = Channel::where('status', '<>', 'Eliminado')->get()->pluck('name', 'id');
        return response()->json([
            'response' => $channels
        ], 200);
    }

    public function getChanneCompleteList(){
        $channels = Channel::where('status', '<>', 'Eliminado')->get();
        return response()->json([
            'response' => $channels
        ], 200);
    }
}
