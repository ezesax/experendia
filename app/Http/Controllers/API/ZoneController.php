<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateZoneRequest;
use App\Http\Requests\EditZoneRequest;
use App\Http\Resources\ZoneResource;
use App\Jobs\BuildTreeJob;
use App\Zone;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ZoneController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        $zoneTree = BuildTreeJob::dispatchNow(Zone::where('status', '<>', 'Eliminado')->where('id', '>', '1')->get()->toArray());
        return response()->json(['response' => $zoneTree], 200);
    }
	
	public function getRootZones()
	{
		$rootZones = Zone::where('status', '<>', 'Eliminado')->where('parent_id', null)->where('id', '>', '1')->get();
        return response()->json(['response' => $rootZones], 200);
	}

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateZoneRequest $request)
    {
        //
        $data = $request->validated();
        $parent_id = array_key_exists ( 'parent_id' , $data );
        if(!$parent_id)
        {
            $data['parent_id'] = null;
        }

        $zone = Zone::where('name', $data['name'])
            ->where('parent_id', $data['parent_id'])
            ->where('status', $data['status'])
            ->exists();
        if($zone)
        {
            return response()->json([
                'created' => false,
                'response' => 'there is already a record with that combination'
            ], 400);
        }
        $item = new Zone($data);
        $item->slug = strtolower($data['name']);
        $item->save();
        return response()->json([
            'created' => true,
            'response' => new ZoneResource($item)
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($zone)
    {
        //
        $item = Zone::findOrFail($zone);

        return response()->json([
            'created' => true,
            'response' => new ZoneResource($item)
        ], 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditZoneRequest $request, $zone)
    {
        //
        $data = $request->validated();
        $item = Zone::findOrFail($zone);
        $data['slug'] = strtolower($data['name']);
        $item->update($data);
        return response()->json([
            'created' => true,
            'response' => new ZoneResource($item)
        ], 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($zone)
    {
        //
        $item = Zone::findOrFail($zone);
        $item->delete();
        return response()->json([], 204);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getZoneList()
    {
        $zones = Zone::where('status', '<>', 'Eliminado')->get()->pluck('name', 'id');
        return response()->json([
            'response' => $zones
        ], 200);
    }
}
