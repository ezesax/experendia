<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChannelResource extends JsonResource
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
            'parent_id'     => $this->paprent_id,
            'name'          => $this->name,
            'slug'          => $this->slug,
            'status'        => $this->status
        ];
    }
}
