<?php

namespace App\Service\Implementations;

use App\Http\Requests\ItemRequest;
use App\Models\Item;
use App\Repository\Interfaces\IItemRepository;
use App\Service\Interfaces\IItemService;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Justfeel\Response\ResponseCodes;
use Justfeel\Response\ResponseResult;

class ItemService implements IItemService
{
    private IItemRepository $itemRepository;

    /**
     * ItemRepository construct injection
     *
     * @param IItemRepository $IItemRepository
     */
    public function __construct(IItemRepository $IItemRepository)
    {
        $this->itemRepository = $IItemRepository;
    }

    /**
     * @return object
     * @throws ValidationException
     */
    public function getItemsByUser(): object
    {
        Log::channel('api')->info("ItemService called --> Request getItemsByUser() function");
        try {
            Log::channel('api')->info("ItemService called --> Return all items by user");

            return ResponseResult::generate(true, $this->itemRepository->getItemsByUser(), ResponseCodes::HTTP_OK);
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
    public function getItemListByAdmin(): object
    {
        Log::channel('api')->info("ItemService called --> Request getItemListByAdmin() function");
        try {
            Log::channel('api')->info("ItemService called --> Return all items by admin");

            return ResponseResult::generate(true, $this->itemRepository->getItemListByAdmin(), ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
        }
    }

    /**
     * @param int $id
     *
     * @return object
     * @throws ValidationException
     */
    public function getItemById(int $id): object
    {
        Log::channel('api')->info("ItemService called --> Request getItemById() function");
        try {
            Log::channel('api')->info("ItemService called --> Return item by ID : " . $id);

            return ResponseResult::generate(true, $this->itemRepository->getItemById($id), ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_NOT_FOUND),
            ]);
        }
    }

    /**
     * @param ItemRequest $request
     *
     * @return object
     * @throws ValidationException
     */
    public function store(ItemRequest $request): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        }

        Log::channel('api')->info("ItemService called --> Request store() function");
        try {
            $item            = new Item();
            $item->user_id   = auth()->user()->id;
            $item->title     = $request->title;
            $item->completed = 0;
            Log::channel('api')->info("ItemService called --> Insert item by user data : " . $item);

            return ResponseResult::generate(true, $this->itemRepository->store($item), ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_BAD_REQUEST),
            ]);
        }
    }

    /**
     * @param ItemRequest $request
     * @param int $id
     *
     * @return object
     * @throws ValidationException
     */
    public function update(ItemRequest $request, int $id): object
    {
        if ($request->validator->fails()) {
            return ResponseResult::generate(false, $request->validator->messages(), ResponseCodes::HTTP_BAD_REQUEST);
        }

        Log::channel('api')->info("ItemService called --> Request update() function");
        try {
            $item            = $this->itemRepository->getItemById($id);
            $item->title     = $request->title;
            $item->completed = $request->completed ? 1 : 0;
            Log::channel('api')->info("ItemService called --> Update item data : " . $item);

            return ResponseResult::generate(true, $this->itemRepository->update($item), ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_NOT_FOUND),
            ]);
        }
    }

    /**
     * @param int $id
     *
     * @return object
     * @throws ValidationException
     */
    public function delete(int $id): object
    {
        Log::channel('api')->info("ItemService called --> Request delete() function");
        try {
            Log::channel('api')->info("ItemService called --> Delete item by ID :" . $id);

            $this->itemRepository->delete($this->itemRepository->getItemById($id));

            return ResponseResult::generate(true, "Successfully Deleted", ResponseCodes::HTTP_OK);
        } catch (\Exception $exception) {
            throw ValidationException::withMessages([
                ResponseResult::generate(false, $exception->getMessage(), ResponseCodes::HTTP_NOT_FOUND),
            ]);
        }
    }
}
