<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;

class ClockInController extends Controller
{
    /**
     * 出勤打刻を記録する
     */
    public function __invoke(Request $request)
    {
        // 既に本日分の出勤が記録されているか確認
        $exists = Attendance::where('user_id', $request->user()->id)
            ->where('work_date', today())
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => '既に本日の出勤が記録されています。',
            ], 422);
        }

        // 出勤時間を記録
        $attendance = Attendance::create([
            'user_id' => $request->user()->id,
            'work_date' => today(),
            'clock_in' => now()->format('H:i:s'),
        ]);

        return response()->json([
            'message' => '出勤時間を記録しました。',
            'attendance' => $attendance,
        ]);
    }
}
