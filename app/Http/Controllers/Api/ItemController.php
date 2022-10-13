<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use App\Models\Item;
use App\Service\Interfaces\IItemService;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Response;
use Justfeel\Response\ResponseResult;

class ItemController extends Controller
{
    private IItemService $itemService;

    /**
     * Item construct
     * @param IItemService $IItemService
     */
    public function __construct(IItemService $IItemService)
    {
        $this->itemService = $IItemService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): object
    {
        return $this->itemService->getItemsByUser();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ItemRequest $request
     *
     * @return Response
     */
    public function store(ItemRequest $request): object
    {
        return $this->itemService->store($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return Response
     */
    public function show(int $id): object
    {
        return $this->itemService->getItemById($id);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param ItemRequest $request
     * @param int $id
     *
     * @return Response
     */
    public function update(ItemRequest $request, int $id): object
    {
        return $this->itemService->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return object
     */
    public function destroy(int $id): object
    {
        return $this->itemService->delete($id);
    }


}
