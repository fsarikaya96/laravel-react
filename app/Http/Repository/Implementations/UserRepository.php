<?php

namespace App\Http\Repository\Implementations;

use App\Http\Repository\Interfaces\IUserRepository;
use App\Models\User;
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
}
