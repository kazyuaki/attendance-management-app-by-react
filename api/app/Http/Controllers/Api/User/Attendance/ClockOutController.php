<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\BreakTime;
use Illuminate\Http\Request;

class ClockOutController extends Controller
{
    /**
     * 退勤打刻を記録する
     */
    public function __invoke(Request $request)
    {
        // 今日の勤怠情報を取得
        $attendance = Attendance::where('user_id', $request->user()->id)
            ->where('work_date', today())
            ->first();

        if (! $attendance) {
            return response()->json([
                'message' => '本日の勤怠情報がありません。',
            ], 422);
        }

        if ($attendance->clock_out) {
            return response()->json([
                'message' => '既に退勤済みです。',
            ], 422);
        }

        // 未終了の休憩があるか確認
        $activeBreak = BreakTime::where('attendance_id', $attendance->id)
            ->whereNull('break_out')
            ->exists();

        if ($activeBreak) {
            return response()->json([
                'message' => '休憩中のため退勤できません。',
            ], 422);
        }

        $attendance->update([
            'clock_out' => now()->format('H:i:s'),
        ]);

        return response()->json([
            'message' => '退勤時間を記録しました。',
            'attendance' => $attendance,
        ]);

    }
}
