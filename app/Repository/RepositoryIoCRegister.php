<?php

namespace App\Repository;

use App\Repository\Implementations\UserRepository;
use App\Repository\Interfaces\IUserRepository;
use App\Repository\Implementations\ItemRepository;
use App\Repository\Interfaces\IItemRepository;

class RepositoryIoCRegister
{
    /**
     * Register Repository dependency injection
     * @return void
     */
    public static function register():void
    {
          app()->bind(IUserRepository::class,UserRepository::class);
          app()->bind(IItemRepository::class,ItemRepository::class);
    }
}
