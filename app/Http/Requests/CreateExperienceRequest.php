<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'title'                 => 'required|string|min:1',
            'description'           => 'required|string|min:1',
            'image'                 => 'required',
            'image.*'               => 'required|image',
            'video'                 => 'required',
            'video.*'               => 'required|url',
            'tag_search'            => 'required|array|min:1',
            'tag_search.*'          => 'required|exists:tag_searches,id',
            'channel'               => 'required|exists:channels,id',
            'status'                => 'required',
            'owner'                 => 'required'
        ];  
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
