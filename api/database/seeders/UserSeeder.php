<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => '山田 太郎',
            'email' => 'yamada@attendance.com',
            'email_verified_at' => now(),
            'password' => 'Password123',
        ]);

        User::create([
            'name' => '佐藤 花子',
            'email' => 'sato@attendance.com',
            'email_verified_at' => now(),
            'password' => 'Password123',
        ]);

        User::create([
            'name' => '鈴木 一郎',
            'email' => 'suzuki@attendance.com',
            'email_verified_at' => now(),
            'password' => 'Password123',
        ]);
    }
}
