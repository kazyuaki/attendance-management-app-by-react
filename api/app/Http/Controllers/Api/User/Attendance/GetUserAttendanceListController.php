<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetUserAttendanceListController extends Controller
{
    /**
     * ユーザー勤怠一覧を取得する
     */
    public function __invoke(Request $request)
    {
        $month = $request->query('month', now()->format('Y-m'));

        $startOfMonth = Carbon::parse($month)->startOfMonth();
        $endOfMonth = Carbon::parse($month)->endOfMonth();

        $attendances = Attendance::with('breakTimes')
            ->where('user_id', $request->user()->id)
            ->whereBetween('work_date', [
                $startOfMonth->toDateString(),
                $endOfMonth->toDateString(),
            ])
            ->orderBy('work_date')
            ->get();

        return response()->json([
            'attendances' => $attendances->map(function ($attendance) {
                $workDate = Carbon::parse($attendance->work_date);
                $weekLabels = ['日', '月', '火', '水', '木', '金', '土'];
                $totalBreakMinutes = $attendance->breakTimes->sum(function ($breakTime) {
                    if (! $breakTime->break_out) {
                        return 0;
                    }

                    return Carbon::parse($breakTime->break_in)
                        ->diffInMinutes(Carbon::parse($breakTime->break_out));
                });

                $totalWorkMinutes = 0;

                if ($attendance->clock_out) {
                    $totalWorkMinutes = Carbon::parse($attendance->clock_in)
                        ->diffInMinutes(Carbon::parse($attendance->clock_out))
                        - $totalBreakMinutes;
                }

                $breakHours = floor($totalBreakMinutes / 60);
                $breakMinutes = $totalBreakMinutes % 60;
                $breakTime = sprintf('%d:%02d', $breakHours, $breakMinutes);

                $totalTime = $attendance->clock_out
                    ? sprintf('%d:%02d', floor($totalWorkMinutes / 60), $totalWorkMinutes % 60)
                    : '';

                return [
                    'id' => $attendance->id,
                    'work_date' => $workDate->format('m/d').'('.$weekLabels[$workDate->dayOfWeek].')',
                    'work_date_value' => $workDate->toDateString(),
                    'clockIn' => Carbon::parse($attendance->clock_in)->format('H:i'),
                    'clockOut' => $attendance->clock_out
                        ? Carbon::parse($attendance->clock_out)->format('H:i')
                        : null,
                    'breakTime' => $breakTime,
                    'totalTime' => $totalTime,
                ];
            }),
        ]);
    }
}
