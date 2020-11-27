<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    //
    public  function register (RegisterRequest  $request) {

        $data = $request->validated();
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = bcrypt($data['password']);
        $user->save();
        $user->assignRole('User');
        return  response()->json([
            'created' => true,
            'data' => new UserResource($user)
        ], 200);
    }

    public function login (LoginRequest $request) {

            $input = $request->only('email', 'password');
            $jwt_token = null;
            if (!$jwt_token = JWTAuth::attempt($input)) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            $user = User::with('profile', 'roles')->where('email', $input['email'])->get()->first();
            return  response()->json([
                'login' => true,
                'token' => $jwt_token,
                'user' => $user,
            ]);
    }
    public  function logout (Request $request) {

        try {
            JWTAuth::invalidate($request->headers->get('authorization'));
            return  response()->json([
                'logout' => true,
                'message' => 'Cierre de sesión exitoso.'
            ], 200);
        } catch (JWTException  $exception) {
            return  response()->json([
                'logout' => false,
                'message' => 'Al usuario no se le pudo cerrar la sesión.'
            ], 500);
        }
    }
}
