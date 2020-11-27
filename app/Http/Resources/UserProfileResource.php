<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfileResource extends JsonResource
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
            'user_id' => $this->user_id, 
            'zone_id' => $this->zone_id, 
            'nationality_id' => $this->nationality_id, 
            'firstname' => $this->firstname, 
            'lastname' => $this->lastname, 
            'username' => $this->username, 
            'description' => $this->description, 
            'phone' => $this->phone,
            'photo' => $this->photo,
            'birthdate' => $this->birthdate,
            'sex' => $this->sex,
            'public' => $this->public
        ];
    }
}
