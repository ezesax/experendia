<?php

namespace App\Http\Resources;

use App\TagTree;
use Illuminate\Http\Resources\Json\JsonResource;

class TagAliasResource extends JsonResource
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
            'name'      => $this->name,
            'alias'     => $this->alias,
            'status'    => $this->status,
            'tag_tree'  => new TagTreeResource($this->whenLoaded('tag_tree'))
        ];
    }
}
