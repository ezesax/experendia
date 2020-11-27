<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\CreateTagTreeRequest;
use App\Http\Requests\EditTagTreeRequest;
use App\Http\Resources\TagTreeResource;
use App\Http\Resources\TagSearchResource;
use App\Jobs\BuildTreeJob;
use App\Jobs\TagSearchJob;
use App\TagTree;
use App\TagSearch;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TagTreeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //
        $tagTree = BuildTreeJob::dispatchNow(
            TagTree::with(['tags:id,name', 'aliases'])
                ->where('status', '<>', 'Eliminado')
                ->get()->sortBy('tags.name')->toArray());
        return response()->json(['response' => $tagTree], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateTagTreeRequest $request)
    {
        //
        $data = $request->validated();
        $item = new TagTree($data);
        $item->tags()->associate($data['tag_id']);
        $item->save();

        TagSearchJob::dispatchNow($item->id);


        return response()->json([
            'created'   => true,
            'response'  => new TagTreeResource($item)
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($tag_tree)
    {
        //
        $item = TagTree::findOrFail($tag_tree);
        $item->load('tags', 'aliases');
        return response()->json([
            'created'   => true,
            'response'  => new TagTreeResource($item)
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditTagTreeRequest $request, $tag_tree)
    {
        //
        $item = TagTree::findOrFail($tag_tree);
        $data = $request->validated();

        $item->update($data);

        return response()->json([
            'created'   => true,
            'response'  => new TagTreeResource($item)
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
        TagTree::destroy($id);

        return response()->json('done!', 200);
    }

    public function getTagTreeList()
    {
        $item = TagTree::where('status', '<>', 'Eliminado')->get();
        $item->load('tags');
        $tag_tree = $item->sortBy('tags.name')->pluck('tags.name', 'id');
        return response()->json([
            'response'  => $tag_tree
        ], 200);
    }

    public function getTagAllBranches($tagId)
    {
        $tagTreesIds = TagTree::where('tag_id', $tagId)->get()->pluck('id');

        $branches = TagSearch::whereIn('tag_tree_id', $tagTreesIds)->select('tree')->distinct()->get();
        
        return response()->json([
            'response' => $branches
        ], 200);
    }
}
