<?php

namespace App\Service\Interfaces;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;

interface IUserService
{
    /**
     * @param RegisterRequest $request
     * Register User Service
     *
     * @return object
     */
    public function register(RegisterRequest $request): object;

    /**
     * Generate new token Service
     *
     * @param LoginRequest $request
     *
     * @return object
     */
    public function generateToken(LoginRequest $request): object;

    /**
     * Delete Token Service
     * @return object
     */
    public function deleteToken(): object;

    /**
     * Get Guest Users Service
     * @return mixed
     */
    public function users(): object;
}
