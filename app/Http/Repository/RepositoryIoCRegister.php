<?php

namespace App\Http\Repository;

use App\Http\Repository\Implementations\UserRepository;
use App\Http\Repository\Interfaces\IUserRepository;

class RepositoryIoCRegister
{
    /**
     * Register Repository dependency injection
     * @return void
     */
    public static function register():void
    {
          app()->bind(IUserRepository::class,UserRepository::class);
    }
}
