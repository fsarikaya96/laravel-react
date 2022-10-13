<?php

namespace App\Service\Interfaces;

use App\Http\Requests\ItemRequest;
use App\Models\Item;

interface IItemService
{
    /**
     * Get items by User Service
     * @return object
     */
    public function getItemsByUser(): object;

    /**
     * @param int $id
     * Fetch item by ID Service
     *
     * @return Item
     */
    public function getItemById(int $id): object;

    /**
     * @param ItemRequest $request
     * Insert Item Service
     *
     * @return Item
     */
    public function store(ItemRequest $request): object;

    /**
     * @param ItemRequest $request
     * @param int $id
     * Update Item Service
     *
     * @return Item
     */
    public function update(ItemRequest $request, int $id): object;

    /**
     * @param int $id
     * Delete Item Service
     *
     * @return object
     */
    public function delete(int $id): object;

}
