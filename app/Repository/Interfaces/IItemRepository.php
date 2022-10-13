<?php

namespace App\Repository\Interfaces;

use App\Models\Item;

interface IItemRepository
{
    /**
     * Get items by User Repository
     * @return object
     */
    public function getItemsByUser(): object;

    /**
     * @param int $id
     * Fetch item by ID Repository
     *
     * @return Item
     */
    public function getItemById(int $id): Item;

    /**
     * @param Item $item
     * Insert Item Repository
     *
     * @return Item
     */
    public function store(Item $item): Item;

    /**
     * @param Item $item
     * Update Item Repository
     *
     * @return Item
     */
    public function update(Item $item): Item;

    /**
     * @param Item $item
     * Delete Item Repository
     *
     * @return bool
     */
    public function delete(Item $item): bool;

}
