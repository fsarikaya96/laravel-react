<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('items')->truncate();
        DB::table('users')->truncate();
        $this->call(UserSeeder::class);
        Item::factory(50)->create();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
