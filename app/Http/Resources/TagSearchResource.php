<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TagSearchResource extends JsonResource
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
            'id'            => $this->id,
            'branch_id'     => $this->branch_id,
            'tag'           => $this->tag,
            'tree'          => $this->tree,
            'status'        => $this->status,
            'tags_tree'     => new TagTreeResource($this->whenLoaded('tags_tree'))
        ];
    }
}
