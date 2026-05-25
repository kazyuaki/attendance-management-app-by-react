<?php

namespace App\Services\Admin\Attendance;

use App\Models\Attendance;
use Illuminate\Support\Facades\DB;

class UpdateAdminAttendanceService
{
    public function update(Attendance $attendance, array $data): void
    {
        DB::transaction(function () use ($attendance, $data) {
            // 勤怠情報の更新
            $attendance->update([
                'clock_in' => $data['clock_in'],
                'clock_out' => $data['clock_out'],
                'note' => $data['note'] ?? null,
            ]);

            $attendance->breakTimes()->delete();

            foreach ($data['break_times'] ?? [] as $breakTime) {
                $attendance->breakTimes()->create([
                    'break_in' => $breakTime['break_in'],
                    'break_out' => $breakTime['break_out'] ?? null,
                ]);
            }
        });
    }
}
