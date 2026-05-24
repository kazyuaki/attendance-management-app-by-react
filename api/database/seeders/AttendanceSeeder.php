<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Database\Seeder;

class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $yamada = User::where('email', 'yamada@attendance.com')->first();
        $sato = User::where('email', 'sato@attendance.com')->first();
        $suzuki = User::where('email', 'suzuki@attendance.com')->first();

        Attendance::create([
            'user_id' => $yamada->id,
            'work_date' => '2024-06-01',
            'clock_in' => '09:00:00',
            'clock_out' => '18:00:00',
        ]);
        
        Attendance::create([
            'user_id' => $sato->id,
            'work_date' => '2024-06-01',
            'clock_in' => '10:00:00',
            'clock_out' => '19:00:00',
        ]);

        Attendance::create([
            'user_id' => $suzuki->id,
            'work_date' => '2024-06-01',
            'clock_in' => '08:30:00',
            'clock_out' => '17:30:00',
        ]);

        Attendance::create([
            'user_id' => $yamada->id,
            'work_date' => '2024-06-02',
            'clock_in' => '09:30:00',
            'clock_out' => '18:30:00',
        ]);

        Attendance::create([
            'user_id' =>  $sato->id,
            'work_date' => '2024-06-02',
            'clock_in' => '10:30:00',
            'clock_out' => '19:30:00',
        ]);

        Attendance::create([
            'user_id' => $suzuki->id,
            'work_date' => '2024-06-02',
            'clock_in' => '08:00:00',
            'clock_out' => '17:00:00',
        ]);
    }
}