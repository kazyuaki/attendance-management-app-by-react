<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetTodayAttendanceController extends Controller
{
    /**
     * 今日の勤怠情報を取得する
     */
    public function __invoke(Request $request): JsonResponse
    {
        // 今日の勤怠情報をユーザーIDと日付で取得
        $attendance = Attendance::with('breakTimes')
            ->where('user_id', $request->user()->id)
            ->whereDate('work_date', today())
            ->first();

        $status = 'off';
        if ($attendance) {
            if ($attendance->clock_out) {
                $status = 'finished';
            } elseif ($attendance->breakTimes()->whereNull('break_out')->exists()) {
                $status = 'break';
            } else {
                $status = 'working';
            }
        }

        if (! $attendance) {
            return response()->json([
                'status' => null,
                'attendance' => null,
            ]);
        }

        return response()->json([
            'status' => $status,
            'attendance' => [
                'id' => $attendance->id,
                'clock_in' => Carbon::parse($attendance->clock_in)->format('H:i'),
                'clock_out' => $attendance->clock_out ? Carbon::parse($attendance->clock_out)->format('H:i') : null,
                'break_times' => $attendance->breakTimes->map(function ($breakTime) {
                    return [
                        'id' => $breakTime->id,
                        'break_in' => Carbon::parse($breakTime->break_in)->format('H:i'),
                        'break_out' => $breakTime->break_out ? Carbon::parse($breakTime->break_out)->format('H:i') : null,
                    ];
                }),

            ],
        ]);
    }
}
