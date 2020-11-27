<?php

namespace App\Http\Resources;

use App\TagTree;
use Illuminate\Http\Resources\Json\JsonResource;

class AliasMeaningResource extends JsonResource
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
            'alias'   => $this->alias,
            'tag'               => new TagResource($this->whenLoaded('tag')),
            'tree'              => new TagTreeResource($this->whenLoaded('tree'))
        ];
    }
}
