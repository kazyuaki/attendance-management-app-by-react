<?php

namespace Database\Seeders;

use App\Models\AdminUser;
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
            'email' => 'adminA@attendance.com',
            'password' => Hash::make('PasswordA123'),
        ]);

        AdminUser::create([
            'name' => '管理者B',
            'email' => 'adminB@attendance.com',
            'password' => Hash::make('PasswordB123'),
        ]);
    }
}
