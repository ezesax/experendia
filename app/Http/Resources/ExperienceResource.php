<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
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
            'title'         => $this->title,
            'description'   => $this->description,
            'image'         => ImageExperienceResource::collection($this->whenLoaded('images')),
            'video'         => VideoExperienceResource::collection($this->whenLoaded('videos')),
            'token'         => $this->token,
            'slug'          => $this->slug,
            'user'          => new UserResource($this->whenLoaded('user')),
            'tag_search'    => TagSearchResource::collection($this->whenLoaded('tag_search')),
        ];
    }
}
