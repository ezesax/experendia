<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditTagTreeRequest extends FormRequest
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
            'tag_id'        => 'required|exists:tags,id',
            'tree'          => 'required|numeric',
            'branch'        => 'required|numeric',
            'level'         => 'required|numeric',
            'parent_id'     => 'nullable|exists:tags,id',
            'status'        => 'required|in:Pendiente,Desactivado,Activo,Eliminado',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
