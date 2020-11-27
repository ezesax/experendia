<?php

namespace App\Http\Requests;

use App\Movement;
use App\MovementStatus;
use App\TagTree;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Validator as Validator2;

class CreateTagTreeRequest extends FormRequest
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
        Validator2::extend('exist_tags_in_tree', function($attribute, $value, $parameters, $validator)
        {
            $pass = false;
            $exist = TagTree::where('tag_id', $value)
                ->where('parent_id', $this->parent_id)
                ->where('branch', $this->branch)
                ->exists();

            if(!$exist)
            {
               $pass = true;
            }

            return $pass;
        },'there is already a record with that data');

        return [
            //
            'tag_id'    => 'required|exists:tags,id|exist_tags_in_tree:tag_id',
            'tree'      => 'required|numeric',
            'branch'    => 'required|numeric',
            'level'     => 'required|numeric',
            'parent_id' => 'nullable|exists:tag_trees,id',
            'status'    => 'required|in:Pendiente,Desactivado,Activo,Eliminado',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(), 400));
    }
}
