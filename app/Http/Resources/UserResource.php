<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id'    => $this->id,
            'name'  => $this->name,
            'email' => $this->email,
            'facebookid' => $this->facebookid, 
            'googleid' => $this->googleid, 
            'linkedinid' => $this->linkedinid, 
            'verified' => $this->verified, 
            'status' => $this->status,
            'roles' => $this->whenLoaded('roles'),
        ];
    }
}
