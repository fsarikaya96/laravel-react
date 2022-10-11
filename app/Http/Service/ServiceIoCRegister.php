<?php

namespace App\Http\Service;

use App\Http\Service\Implementations\UserService;
use App\Http\Service\Interfaces\IUserService;

class ServiceIoCRegister
{
    /**
     * Register Service dependency injection
     * @return void
     */

    public static function register() : void
    {
        app()->bind(IUserService::class,UserService::class);
    }
}
