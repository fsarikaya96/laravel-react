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
     * @return User
     */
    public function register(User $user): User
    {
        $user->save();

        return $user;
    }
    public function generateToken(Authenticatable $auth): string
    {
        return $auth->createToken('myApp')->plainTextToken;
    }
    public function deleteToken(Authenticatable $auth): bool
    {
        return $auth->tokens()->delete();
    }
}
