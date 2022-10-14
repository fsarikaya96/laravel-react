<?php

namespace App\Repository\Interfaces;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

interface IUserRepository
{
    /**
     * @param User $user
     * Insert User Repository
     *
     * @return User
     */
    public function register(User $user): User;

    /**
     * Generate new Token by User Repository
     *
     * @param Authenticatable $auth
     *
     * @return string
     */
    public function generateToken(Authenticatable $auth): string;

    /**
     * @param Authenticatable $auth
     * Delete Token by User Repository
     *
     * @return bool
     */
    public function deleteToken(Authenticatable $auth): bool;

    /**
     * Get Guest Users Repository
     * @return mixed
     */
    public function users(): mixed;
}
