<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\BreakTime;
use Illuminate\Http\Request;

class BreakOutController extends Controller
{
    /**
     * 休憩終了を記録する。
     */
    public function __invoke(Request $request)
    {
        // 今日の勤怠情報を取得
        $attendance = Attendance::where('user_id', $request->user()->id)
            ->where('work_date', today())
            ->first();

        // 未終了の休憩があるか確認
        $break = BreakTime::where('attendance_id', $attendance->id)
            ->whereNull('break_out')
            ->first();

        if (! $break) {
            return response()->json([
                'message' => '休憩中ではありません。',
            ], 422);
        }

        // 休憩終了を記録
        $break->update([
            'break_out' => now()->format('H:i:s'),
        ]);

        return response()->json([
            'message' => '休憩終了を記録しました。',
        ]);
    }
}
