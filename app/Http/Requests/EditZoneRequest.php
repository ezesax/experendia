<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditZoneRequest extends FormRequest
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
            'parent_id'     => 'nullable|exists:zones,id',
            'name'          => 'required|string|min:1',
            'denomination'  => 'nullable|string|min:1',
            'latitude'      => 'nullable|string|min:1',
            'longitude'     => 'nullable|string|min:1',
            'status'        => 'required|in:Pendiente,Desactivado,Activo,Eliminado',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
