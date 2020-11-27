<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateActivitieRequest;
use App\Http\Requests\EditActivitieRequest;
use App\Http\Resources\TagResource;
use App\Tag;
use App\TagType;
use Illuminate\Http\Request;//
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;

class ActivitieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return Tag::whereHas('tag_type', function(Builder $query){
            $query->where('tag_types.id', '1');
        })->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateActivitieRequest $request)
    {
        //
        $data = $request->validated();
        $item = new Tag($data);
        $item->slug = strtolower($data['name']);
        $item->save();
        $item->tag_type()->attach(['1']);

        return response()->json([
            'created'   => true,
            'response'  => new TagResource($item)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id  $activitie
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        //
        $item = Tag::findOrFail($id);
        $item->load('tag_type');
        return response()->json([
            'created' => true,
            'response' => new TagResource($item)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditActivitieRequest $request, $id)
    {
        //
        $item = Tag::findOrFail($id);
        $data = $request->validated();
        $data['slug'] = strtolower($data['name']);
        $item->tag_type()->sync(['1']);
        $item->update($data);

        return response()->json([
            'created'   => true,
            'response'  => new TagResource($item)
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
        //
        $item = Tag::findOrFail($id);
        $item->tag_type()->detach();
        $item->delete();
        return response()->json([], 204);
    }
}
