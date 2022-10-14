<?php

namespace App\Repository\Implementations;

use App\Models\User;
use App\Repository\Interfaces\IUserRepository;
use Illuminate\Contracts\Auth\Authenticatable;

class UserRepository implements IUserRepository
{
    /**
     * @param User $user
     * Insert User Repository
     *
     * @return User
     */
    public function register(User $user): User
    {
        $user->save();

        return $user;
    }

    /**
     * @param Authenticatable $auth
     * Generate new Token by User Repository
     *
     * @return string
     */
    public function generateToken(Authenticatable $auth): string
    {
        return $auth->createToken('myApp')->plainTextToken;
    }

    /**
     * @param Authenticatable $auth
     * Delete Token by User Repository
     *
     * @return bool
     */
    public function deleteToken(Authenticatable $auth): bool
    {
        return $auth->tokens()->delete();
    }

    /**
     * Get Guest Users Repository
     * @return mixed
     */
    public function users(): mixed
    {
        return User::where('role_as', 0)->get();
    }
}
