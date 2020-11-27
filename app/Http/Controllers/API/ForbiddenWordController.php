<?php

namespace App\Http\Controllers\API;

use App\ForbiddenWord;
use App\Http\Resources\ForbiddenWordResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateForbiddenWordRequest;
use App\Http\Requests\EditForbiddenWordRequest;

class ForbiddenWordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        //
        $forbiddenWords = ForbiddenWord::where('status', '<>', 'Eliminado')->get();
        return response()->json(['response' => $forbiddenWords], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CreateForbiddenWordRequest $request)
    {
        //
        $data = $request->validated();
        $item = new ForbiddenWord($data);
        $item->save();

        return response()->json([
            'created'   => true,
            'response'  => new ForbiddenWordResource($item)
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($word)
    {
        //
        $item = ForbiddenWord::findOrFail($word);

        return response()->json([
            'response' => new ForbiddenWordResource($item)
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(EditForbiddenWordRequest $request, $word)
    {
        //
        $data = $request->validated();
        $item = ForbiddenWord::findOrFail($word);
        $item->update($data);

        return response()->json([
            'edited'    => true,
            'response'  => new ForbiddenWordResource($item)
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
        $item = ForbiddenWord::findOrFail($id);
        $item->delete();
        return response()->json([], 204);
    }
}
