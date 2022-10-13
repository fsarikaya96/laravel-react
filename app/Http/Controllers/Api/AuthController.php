<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Service\Interfaces\IUserService;

class AuthController extends Controller
{
    private IUserService $userService;

    /**
     * User Construct
     * @param IUserService $IUserService
     */
    public function __construct(IUserService $IUserService)
    {
        $this->userService = $IUserService;
    }

    /**
     * @param RegisterRequest $request
     *
     * @return object
     */
    public function register(RegisterRequest $request):object
    {
        return $this->userService->register($request);
    }

    /**
     * @param LoginRequest $request
     *
     * @return object
     */
    public function login(LoginRequest $request):object
    {
        return $this->userService->generateToken($request);
    }

    /**
     * @return object
     */
    public function logout():object
    {
        return $this->userService->deleteToken();
    }
}
