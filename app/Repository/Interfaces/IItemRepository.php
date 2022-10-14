<?php

namespace App\Repository\Interfaces;

use App\Models\Item;
use Illuminate\Support\Collection;

interface IItemRepository
{
    /**
     * Get items by User Repository
     * @return object
     */
    public function getItemsByUser(): object;

    /**
     * Item list that only admins can see Repository
     * @return Collection
     */
    public function getItemListByAdmin(): Collection;

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
