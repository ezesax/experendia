<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateTagRequest;
use App\Http\Requests\EditTagRequest;
use App\Http\Resources\TagResource;
use App\Tag;
use App\TagType;
use App\TagExperiences;
use Illuminate\Http\Request;//
use App\Http\Controllers\Controller;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        //
        return TagResource::collection(
            Tag::all()
        );
    }

    public function getTenMoreUsefull(Request $request){
        $ids = TagExperiences::select('tag_id')
                             ->where('channel_id', $request->id)
                             ->orderBy('hits', 'desc')
                             ->take('10')
                             ->get();
        $tags= Tag::whereIn('id', $ids)->get();

        return response()->json(['response' => $tags]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateTagRequest $request)
    {
        //
        $data = $request->validated();
        $item = new Tag($data);
        $item->slug = strtolower($data['name']);
        $item->save();
        $item->tag_type()->attach($data['tag_type']);

        return response()->json([
            'created'   => true,
            'response'  => new TagResource($item)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($tag)
    {
        //
        $item = Tag::findOrFail($tag);
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
    public function update(EditTagRequest $request, $tag)
    {
        //
        $item = Tag::findOrFail($tag);
        $data = $request->validated();
        $data['slug'] = strtolower($data['name']);
        $item->tag_type()->sync($data['tag_type']);
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
    public function destroy($tag)
    {
        //
        $item = Tag::findOrFail($tag);
        $item->tag_type()->detach();
        $item->delete();
        return response()->json([], 204);
    }

    public function getTagList()
    {
        $tag = Tag::all()->pluck('name', 'id');

        return response()->json([
            'response'  => $tag
        ], 200);
    }

    public function getTagTypes()
    {
        $types = TagType::all()->pluck('name', 'id');

        return response()->json([
            'response' => $types
        ], 200);
    }
}
