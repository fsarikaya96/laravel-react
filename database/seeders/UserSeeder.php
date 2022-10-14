<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
            [
                'name'     => 'Admin',
                'email'    => 'admin@admin.com',
                'password' => Hash::make(12),
                'role_as'  => 1,
            ],
            [
                'name'     => 'Ferhat Sarıkaya',
                'email'    => 'fsarikaya96@hotmail.com',
                'password' => Hash::make(12),
                'role_as'  => 0,
            ],
            [
                'name'     => 'Volkan Sarıkaya',
                'email'    => 'volkans_18@hotmail.com',
                'password' => Hash::make(12),
                'role_as'  => 0,
            ],
        ]);
    }
}
