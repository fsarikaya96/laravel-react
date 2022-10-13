<?php

namespace App\Repository\Implementations;

use App\Models\Item;
use App\Repository\Interfaces\IItemRepository;

class ItemRepository implements IItemRepository
{
    /**
     * Get items by User Repository
     * @return object
     */
    public function getItemsByUser(): object
    {
        return Item::where('user_id', auth()->user()->id)->orderBy('id', 'DESC')->get();
    }

    /**
     * @param int $id
     * Fetch item by ID Repository
     * @return Item
     */
    public function getItemById(int $id): Item
    {
        return Item::findOrfail($id);
    }

    /**
     * @param Item $item
     * Insert Item Repository
     * @return Item
     */
    public function store(Item $item): Item
    {
        $item->save();

        return $item;
    }

    /**
     * @param Item $item
     * Update Item Repository
     * @return Item
     */
    public function update(Item $item): Item
    {
        $item->save();

        return $item;
    }

    /**
     * @param Item $item
     * Delete Item Repository
     * @return bool
     */
    public function delete(Item $item): bool
    {
        return $item->delete();
    }

}
