<?php

namespace App\Http\Controllers\Api\Admin\Attendance;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Models\Attendance;

class GetAdminAttendanceDetailController extends Controller
{
    /**
     * 管理者側 勤怠詳細取得
     */
    public function __invoke(Attendance $attendance): JsonResponse
    {
        return response()->json([
            'id' => $attendance->id,
            'user_name' => $attendance->user->name,
            'work_date' => Carbon::parse($attendance->work_date)->format('Y年n月j日'),
            'clock_in' => Carbon::parse($attendance->clock_in)->format('H:i'),
            'clock_out' => $attendance->clock_out ? Carbon::parse($attendance->clock_out)->format('H:i') : null,
            'note' => $attendance->note ?? '',
            'break_times' => $attendance->breakTimes->map(function ($breakTime) {
                return [
                    'id' => $breakTime->id,
                    'start_time' => Carbon::parse($breakTime->break_start)->format('H:i'),
                    'end_time' => $breakTime->break_end ? Carbon::parse($breakTime->break_end)->format('H:i') : null,
                ];
            }),
        ]);
    }
}
