<?php

namespace App\Http\Controllers\API;

use App\AliasMeaning;
use App\Http\Requests\CreteAliasMeaningRequest;
use App\Http\Resources\AliasMeaningResource;
use App\Tag;
use App\TagAlias;
use App\TagTree;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AliasMeaningController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        //
        return AliasMeaningResource::collection(
            AliasMeaning::all()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreteAliasMeaningRequest $request)
    {
        //
        $data = $request->validated();
        $tag_alias_alias = TagAlias::findOrFail($data['tag_alias_id']);
        $tag_tree = TagTree::findOrFail($data['tag_tree_id']);
        $tag = Tag::findOrFail($data['tag_id']);
        $aliasMeaning = new AliasMeaning();
        $aliasMeaning->alias = $tag_alias_alias->alias;
        $aliasMeaning->tag()->associate($tag);
        $aliasMeaning->tree()->associate($tag_tree);
        $aliasMeaning->save();

        return response()->json([
            'created'   => true,
            'response'  => new AliasMeaningResource($aliasMeaning)
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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
}
