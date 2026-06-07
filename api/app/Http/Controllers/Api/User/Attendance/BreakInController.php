<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\BreakTime;
use Illuminate\Http\Request;

class BreakInController extends Controller
{
    /**
     * 休憩開始を記録する
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

        // 終了していない休憩があるか確認
        $activeBreak = BreakTime::where('attendance_id', $attendance->id)
            ->whereNull('break_out')
            ->exists();

        if ($activeBreak) {
            return response()->json([
                'message' => '既に休憩中です。',
            ], 422);
        }

        // 休憩開始を記録
        BreakTime::create([
            'attendance_id' => $attendance->id,
            'break_in' => now()->format('H:i:s'),
        ]);

        return response()->json([
            'message' => '休憩開始を記録しました',
        ]);
    }
}
