<?php

namespace App\Http\Controllers\Api\Admin\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

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
            'work_date_value' => Carbon::parse($attendance->work_date)->format('Y-m-d'),
            'work_date' => Carbon::parse($attendance->work_date)->format('Y年n月j日'),
            'clock_in' => Carbon::parse($attendance->clock_in)->format('H:i'),
            'clock_out' => $attendance->clock_out ? Carbon::parse($attendance->clock_out)->format('H:i') : null,
            'note' => $attendance->note ?? '',
            'break_times' => $attendance->breakTimes->map(function ($breakTime) {
                return [
                    'id' => $breakTime->id,
                    'break_in' => Carbon::parse($breakTime->break_in)->format('H:i'),
                    'break_out' => $breakTime->break_out ? Carbon::parse($breakTime->break_out)->format('H:i') : null,
                ];
            }),
        ]);
    }
}
