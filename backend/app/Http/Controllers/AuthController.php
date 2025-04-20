<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;
use Str;

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

    /**
     * @unauthenticated
     */
    public function handleSocialLogin(Request $request)
    {
        $provider = $request->input('provider');
        $token = $request->input('token');

        if ($provider === 'google') {
            try {
                $socialUser = Socialite::driver('google')->userFromToken($token);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Invalid Google token'], 401);
            }
        } elseif ($provider === 'github') {
            try {
                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $token,
                    'Accept' => 'application/json',
                ])->get('https://api.github.com/user');
                if ($response->failed()) {
                    return response()->json(['error' => 'Invalid GitHub token'], 401);
                }

                $userData = $response->json();
                if ($userData['email'] == null) {
                    $emailResponse = Http::withHeaders([
                        'Authorization' => 'Bearer ' . $token,
                        'Accept' => 'application/json',
                    ])->get('https://api.github.com/user/emails');
                    $emails = $emailResponse->json();
                    $userData['email'] = $emails[0]['email'] ?? null;
                }
                $socialUser = (object) [
                    'id' => $userData['id'],
                    'name' => $userData['name'] ?? $userData['login'],
                    'email' => $userData['email'],
                ];
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error verifying GitHub token'], 500);
            }
        } else {
            return response()->json(['error' => 'Unsupported provider'], 400);
        }

        if ($socialUser->email == null) {
            return response()->json(['message' => 'A valid email address is required'], 422);
        }

        $user = User::where('provider', $provider)
            ->where('provider_id', $socialUser->id)
            ->first();

        if (!$user) {
            $existingUser = User::where('email', $socialUser->email)->first();
            if ($existingUser) {
                $existingUser->provider = $provider;
                $existingUser->provider_id = $socialUser->id;
                $existingUser->save();
                $user = $existingUser;
            } else {
                $user = User::create([
                    'name' => $socialUser->name,
                    'email' => $socialUser->email,
                    'provider' => $provider,
                    'provider_id' => $socialUser->id,
                    'password' => Hash::make(Str::random(16)),
                ]);
            }
        }

        $token = $user->createToken('app-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            /** @var User $user */
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
