<?php

namespace Database\Seeders;

use App\Models\Attendance;
use App\Models\BreakTime;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BreakTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $yamada = User::where('email', 'yamada@attendance.com')->first();
        $sato = User::where('email', 'sato@attendance.com')->first();
        $suzuki = User::where('email', 'suzuki@attendance.com')->first();

        $yamadaAttendance = Attendance::where('user_id', $yamada->id)
            ->where('work_date', '2026-06-01')
            ->first();

        $satoAttendance = Attendance::where('user_id', $sato->id)
            ->where('work_date', '2026-06-01')
            ->first();

        $suzukiAttendance = Attendance::where('user_id', $suzuki->id)
            ->where('work_date', '2026-06-01')
            ->first();

        BreakTime::create([
            'attendance_id' => $yamadaAttendance->id,
            'break_in' => '12:00:00',
            'break_out' => '13:00:00',

        ]);

        BreakTime::create([
            'attendance_id' => $satoAttendance->id,
            'break_in' => '13:00:00',
            'break_out' => '14:00:00',

        ]);

        BreakTime::create([
            'attendance_id' => $suzukiAttendance->id,
            'break_in' => '12:30:00',
            'break_out' => '13:30:00',
        ]);

        $yamadaAttendance0602 = Attendance::where('user_id', $yamada->id)
            ->where('work_date', '2026-06-02')
            ->first();

        $satoAttendance0602 = Attendance::where('user_id', $sato->id)
            ->where('work_date', '2026-06-02')
            ->first();

        $suzukiAttendance0602 = Attendance::where('user_id', $suzuki->id)
            ->where('work_date', '2026-06-02')
            ->first();

        if ($yamadaAttendance0602) {
            BreakTime::create([
                'attendance_id' => $yamadaAttendance0602->id,
                'break_in' => '12:00:00',
                'break_out' => '13:00:00',
            ]);
        }

        if ($satoAttendance0602) {
            BreakTime::create([
                'attendance_id' => $satoAttendance0602->id,
                'break_in' => '13:00:00',
                'break_out' => '14:00:00',
            ]);
        }

        if ($suzukiAttendance0602) {
            BreakTime::create([
                'attendance_id' => $suzukiAttendance0602->id,
                'break_in' => '12:30:00',
                'break_out' => '13:30:00',
            ]);
        }

    }
}
