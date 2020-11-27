<?php

namespace App\Http\Resources;

use App\TagAlias;
use Illuminate\Http\Resources\Json\JsonResource;

class TagResource extends JsonResource
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
            'name'          => $this->name,
            'slug'          => $this->slug,
            'description'   => $this->description,
            'keywords'      => $this->keywords,
            'icon'          => $this->icon,
            'image_default' => $this->image_default,
            'status'        => $this->status,
            'tag_type'      => TagTypeResource::collection($this->whenLoaded('tag_type'))
        ];
    }
}
