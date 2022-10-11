<?php

namespace App\Http\Service\Interfaces;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

interface IUserService
{
    public function register(RegisterRequest $request):object;

    /**
     * Generate new token
     *
     * @param LoginRequest $request
     *
     * @return object
     */
    public function generateToken(LoginRequest $request) : object;
}
