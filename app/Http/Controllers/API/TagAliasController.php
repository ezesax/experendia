<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateTagAliasRequest;
use App\Http\Requests\EditTagAliasRequest;
use App\Http\Resources\TagAliasResource;
use App\Http\Resources\TagTreeResource;
use App\Jobs\TagSearchJob;
use App\TagAlias;
use App\TagTree;
use App\TagSearch;
use App\Tag;
use App\Http\Controllers\Controller;

class TagAliasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index($tag_tree)
    {
        //
        return TagAliasResource::collection(
            TagAlias::where('tag_tree_id', $tag_tree)->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateTagAliasRequest $request, $tag_tree)
    {
        //
        $tagTree = TagTree::findOrFail($tag_tree);
        $tagTree->aliases()->delete();
        $tagName = Tag::findOrFail($tagTree->tag_id)->name;
        TagSearch::where('tag_tree_id', $tag_tree)->where('tag', '!=', $tagName)->delete();

        $data = $request->validated();
        $aliases = explode(';',  $data['name']);
        $alias_array = [];
        $data['alias'] = TagAlias::max('alias') + 1;
        foreach ($aliases as $alias)
        {
            $alias_array[] = new TagAlias([
                "name" => $alias,
                "alias" => $data['alias'],
                "status" => $data['status']
            ]);
        }

        $tagTree->aliases()->saveMany($alias_array);
        foreach ($alias_array as $alias){
            TagSearchJob::dispatchNow($tagTree->id, $alias->name);
        }

        $tagTree->load('aliases');
        return response()->json([
            'created'   => true,
            'response'  => new TagTreeResource($tagTree)
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($tag_tree, $tag_alias)
    {
        //
        $item = TagAlias::findOrFail($tag_alias);
        if($item->tag_tree_id != $tag_tree)
        {
            return response()->json([
                'error'     => true,
                'response'  => 'the alias and tag combination is not valid'
            ], 400);
        }
        $item->load('tag_tree');
        return response()->json([
            'created'   => true,
            'response'  => new TagAliasResource($item)
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param EditTagAliasRequest $request
     * @param $tag_tree
     * @param $tag_alias
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditTagAliasRequest $request, $tag_tree, $tag_alias)
    {
        //
        $tagAlias = TagAlias::where('id', $tag_alias)
            ->where('tag_tree_id', $tag_tree)
            ->get()
            ->first();
        if($tagAlias == null)
        {
            return response()->json([
                'error'     => true,
                'response'  => 'the alias and tag combination is not valid'
            ], 400);
        }
        $data = $request->validated();
        $tagAlias->update($data);

        return response()->json([
            'created'   => true,
            'response'  => new TagAliasResource($tagAlias)
        ]);
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
