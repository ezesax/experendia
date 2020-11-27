<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TagTreeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'tags'      => new TagResource($this->whenLoaded('tags')),
            'tree'      => $this->tree,
            'brach'     => $this->branch,
            'level'     => $this->level,
            'parent_id' => $this->parent_id,
            'status'    => $this->status,
            'aliases'   => TagAliasResource::collection($this->whenLoaded('aliases'))

        ];
    }
}
