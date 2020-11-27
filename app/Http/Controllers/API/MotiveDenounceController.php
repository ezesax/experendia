<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateMotiveDenounceRequest;
use App\Http\Requests\EditMotiveDenounceRequest;
use App\Http\Resources\MotiveDenounceResource;
use App\Jobs\BuildTreeJob;
use App\MotiveDenounce;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MotiveDenounceController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        $motiveDenounceTree = BuildTreeJob::dispatchNow(MotiveDenounce::where('status', '<>', 'Eliminado')->get()->toArray());
        return response()->json(['response' => $motiveDenounceTree], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateMotiveDenounceRequest $request)
    {
        //
        $data = $request->validated();
        $parent_id = array_key_exists ( 'parent_id' , $data );
        if(!$parent_id)
        {
            $data['parent_id'] = null;
        }

        $motiveDenounce = MotiveDenounce::where('name', $data['name'])
            ->where('parent_id', $data['parent_id'])
            ->where('status', $data['status'])
            ->exists();
        if($motiveDenounce)
        {
            return response()->json([
                'created' => false,
                'response' => 'there is already a record with that combination'
            ], 400);
        }
        $item = new MotiveDenounce($data);
        $item->slug = strtolower($data['name']);
        $item->save();
        return response()->json([
            'created' => true,
            'response' => new MotiveDenounceResource($item)
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($motiveDenounce)
    {
        //
        $item = MotiveDenounce::findOrFail($motiveDenounce);

        return response()->json([
            'created' => true,
            'response' => new MotiveDenounceResource($item)
        ], 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditMotiveDenounceRequest $request, $motiveDenounce)
    {
        //
        $data = $request->validated();
        $item = MotiveDenounce::findOrFail($motiveDenounce);
        $data['slug'] = strtolower($data['name']);
        $item->update($data);
        return response()->json([
            'created' => true,
            'response' => new MotiveDenounceResource($item)
        ], 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($motiveDenounce)
    {
        //
        $item = MotiveDenounce::findOrFail($motiveDenounce);
        $item->delete();
        return response()->json([], 204);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMotiveDenounceList()
    {
        $motiveDenounce = MotiveDenounce::where('status', '<>', 'Eliminado')->get()->pluck('name', 'id');
        return response()->json([
            'response' => $motiveDenounce
        ], 200);
    }
}
