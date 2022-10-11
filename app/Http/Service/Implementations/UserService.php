<?php

namespace App\Http\Service\Implementations;

use App\Http\Repository\Interfaces\IUserRepository;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Service\Interfaces\IUserService;
use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Justfeel\Response\ResponseCodes;
use Justfeel\Response\ResponseResult;
use Illuminate\Support\Facades\Hash;


class UserService implements IUserService
{
    private IUserRepository $userRepository;

    public function __construct(IUserRepository $IUserRepository)
    {
        $this->userRepository = $IUserRepository;
    }

    public function register(RegisterRequest $request): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        } else {
            $user           = new User();
            $user->name     = $request->name;
            $user->email    = $request->email;
            $user->password = Hash::make($request->password);
            $userStore      = $this->userRepository->register($user);

            return ResponseResult::generate(true, $userStore, ResponseCodes::HTTP_OK);
        }
    }

    /**
     * Get already logged user
     *
     * @return Authenticatable|null
     */
    private function _getLoggedUser(): ?Authenticatable
    {
        return Auth::user() ?? null;
    }


    public function generateToken(LoginRequest $request): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        }

        if (Auth::attempt($request->except('error_list'))) {
            $user = $this->userRepository->generateToken($this->_getLoggedUser());

            return ResponseResult::generate(true, ['name' => Auth::user()->name,'role_as' => Auth::user()->role_as,'token' => $user], ResponseCodes::HTTP_OK);
        }

        return ResponseResult::generate(false, ['notFound' => "Böyle Bir Kullanıcı Bulunamadı."], ResponseCodes::HTTP_NOT_FOUND);
    }
}
