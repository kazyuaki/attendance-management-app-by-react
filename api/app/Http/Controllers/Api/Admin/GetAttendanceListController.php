<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Services\AttendanceTimeService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetAttendanceListController extends Controller
{
     /**
     * 勤怠一覧取得
     */
    public function __invoke(
        Request $request,
        AttendanceTimeService $attendanceTimeService
    ): JsonResponse
    {
        // クエリパラメータから日付取得
        $date = $request->query('date', '2026-06-01');

        // 日付に基づいて勤怠データを取得
        $attendances = Attendance::with(['user', 'breakTimes'])
            ->whereDate('work_date', $date)
            ->orderBy('clock_in')
            ->get()
            ->map(function (Attendance $attendance) use ($attendanceTimeService) {
                // 休憩時間の合計を計算
                $breakMinutes = $attendanceTimeService->calculateBreakMinutes($attendance);

                // 勤務時間から休憩時間を引いた合計勤務時間を計算
                $totalMinutes = $attendanceTimeService->calculateTotalMinutes($attendance, $breakMinutes);

                return [
                    'id' => $attendance->id,
                    'user_name' => $attendance->user->name,
                    'clock_in' => Carbon::parse($attendance->clock_in)->format('H:i'),
                    'clock_out' => $attendance->clock_out ? Carbon::parse($attendance->clock_out)->format('H:i') : null,
                    'break_time' => $attendanceTimeService->formatMinutes($breakMinutes),
                    'total_time' => $attendanceTimeService->formatMinutes($totalMinutes),
                ];
            });

        return response()->json([
            'data' => $attendances,
        ]);

    }
}
