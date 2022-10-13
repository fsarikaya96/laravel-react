<?php

namespace App\Service;

use App\Service\Implementations\ItemService;
use App\Service\Implementations\UserService;
use App\Service\Interfaces\IItemService;
use App\Service\Interfaces\IUserService;

class ServiceIoCRegister
{
    /**
     * Register Service dependency injection
     * @return void
     */

    public static function register() : void
    {
        app()->bind(IUserService::class,UserService::class);
        app()->bind(IItemService::class,ItemService::class);
    }
}
