<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * @response User
     */
    public function currentUser(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * @return array{token: string, user: User}
     * @unauthenticated
     */
    public function register(Request $request)
    {
        $request->merge([
            'password_confirmation' => $request->input('passwordConfirmation')
        ]);
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            'passwordConfirmation' => 'required',
            /** @ignoreParam */
            'password_confirmation' => ''
        ]);

        $user = User::create($data);

        $token = $user->createToken($request->name);

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user
        ]);
    }

    /**
     * @response array{token: string, user: User}
     * @unauthenticated
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Incorrect email or password'
            ], 422);
        }

        $token = $user->createToken($user->name);

        return response()->json([
            'token' => $token->plainTextToken,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out!'
        ]);
    }
}
