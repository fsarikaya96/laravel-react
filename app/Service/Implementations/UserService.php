<?php

namespace App\Service\Implementations;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Repository\Interfaces\IUserRepository;
use App\Service\Interfaces\IUserService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Justfeel\Response\ResponseCodes;
use Justfeel\Response\ResponseResult;


class UserService implements IUserService
{
    private IUserRepository $userRepository;

    /**
     * UserRepository construct injection
     *
     * @param IUserRepository $IUserRepository
     */
    public function __construct(IUserRepository $IUserRepository)
    {
        $this->userRepository = $IUserRepository;
    }

    /**
     * @param RegisterRequest $request
     *
     * @return object
     * @throws ValidationException
     */
    public function register(RegisterRequest $request): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        }
        Log::channel('api')->info("UserService called --> Request register() function");
        try {
            $user           = new User();
            $user->name     = $request->name;
            $user->email    = $request->email;
            $user->password = Hash::make($request->password);
            $userStore      = $this->userRepository->register($user);
            Log::channel('api')->info("UserService called --> Return created user data :" . $userStore);

            return ResponseResult::generate(true, $userStore, ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
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

    /**
     * @param LoginRequest $request
     *
     * @return object
     * @throws ValidationException
     */
    public function generateToken(LoginRequest $request): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        }
        Log::channel('api')->info("UserService called --> Request generateToken() function");
        try {
            if (Auth::attempt($request->except('error_list'))) {
                $token = $this->userRepository->generateToken($this->_getLoggedUser());
                Log::channel('api')->info("UserService called --> Return generate token : " . $token);

                return ResponseResult::generate(true, ['user' => Auth::user(), 'token' => $token], ResponseCodes::HTTP_OK);
            }

            return ResponseResult::generate(false, ['notFound' => "Böyle Bir Kullanıcı Bulunamadı."], ResponseCodes::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
        }
    }

    /**
     * @return object
     * @throws ValidationException
     */
    public function deleteToken(): object
    {
        Log::channel('api')->info("UserService called --> Request deleteToken() function");
        try {
            $this->userRepository->deleteToken(auth()->user());
            Log::channel('api')->info("UserService called --> Return delete token");

            return ResponseResult::generate(true, "Logout Successfully", ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
        }
    }

    /**
     * @return object
     * @throws ValidationException
     */
    public function users(): object
    {
        Log::channel('api')->info("UserService called --> Request users() function");
        try {
            $this->userRepository->deleteToken(auth()->user());
            Log::channel('api')->info("UserService called --> Return guest users");

            return ResponseResult::generate(true, $this->userRepository->users(), ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
        }
    }
}
