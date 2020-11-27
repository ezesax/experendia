<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateTagRequest extends FormRequest
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
            'name'          => 'required|string|min:1|unique:tags,name',
            'description'   => 'required|string|min:1',
            'keywords'      => 'nullable|string|min:1',
            'icon'          => 'nullable|string|min:1',
            'image_default' => 'nullable|string|min:1',
            'tag_type'      => 'required|array|min:1',
            'tag_type.*'    => 'required|exists:tag_types,id',
            'status'        => 'required|in:Pendiente,Desactivado,Activo,Eliminado',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}

