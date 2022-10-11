<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Service\Interfaces\IUserService;

class AuthController extends Controller
{
    private IUserService $userService;

    public function __construct(IUserService $IUserService)
    {
        $this->userService = $IUserService;
    }

    public function register(RegisterRequest $request)
    {
        return $this->userService->register($request);
    }

    public function login(LoginRequest $request)
    {
        return $this->userService->generateToken($request);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['success' => true,'message' => 'Çıkış Başarılı']);
    }
}
