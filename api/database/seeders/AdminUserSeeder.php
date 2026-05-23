<?php

namespace Database\Seeders;

use App\Models\AdminUser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminUser::create([
            'name' => '管理者A',
            'email' => 'adminA@example.com',
            'password' => Hash::make('passwordA'),
        ]);

        AdminUser::create([
            'name' => '管理者B',
            'email' => 'adminB@example.com',
            'password' =>  Hash::make('passwordB'),
        ]);
    }
}
