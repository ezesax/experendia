<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditUserProfileRequest extends FormRequest
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
            'user_id'           => 'required|exists:users,id',
            'nationality_id'    => 'required|exists:zones,id',
            'zone_id'           => 'nullable|exists:zones,id|',
            'firstname'         => 'required|string|min:1',
            'lastname'          => 'nullable|string|min:1',
            'description'       => 'nullable|string|min:1',
            'phone'             => 'nullable|string|min:1',
            'photo'             => 'nullable|string|min:1',
            'birthdate'         => 'nullable|string|min:1',
            'sex'               => 'nullable|in:Hombre,Mujer,Neutro',
            'public'            => 'nullable|smallInteger',
            'status'            => 'required|in:Pendiente,Desactivado,Activo,Eliminado',
        ];
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
