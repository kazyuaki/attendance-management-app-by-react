<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceEditRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetUserAttendanceDetailController extends Controller
{
    /**
     * ユーザー勤怠詳細を取得する
     */
    public function __invoke(Request $request, Attendance $attendance)
    {
        if ($attendance->user_id !== $request->user()->id) {
            abort(403);
        }

        $attendance->load('breakTimes');

        $isAttendanceEditRequested = AttendanceEditRequest::where('attendance_id', $attendance->id)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();

        return response()->json([
            'attendance' => [
                'id' => $attendance->id,
                'user_name' => $request->user()->name,
                'work_date' => Carbon::parse($attendance->work_date)->format('Y年n月j日'),
                'clock_in' => Carbon::parse($attendance->clock_in)->format('H:i'),
                'clock_out' => $attendance->clock_out
                    ? Carbon::parse($attendance->clock_out)->format('H:i')
                    : null,
                'note' => $attendance->note,
                'break_times' => $attendance->breakTimes->map(function ($breakTime) {
                    return [
                        'id' => $breakTime->id,
                        'break_in' => Carbon::parse($breakTime->break_in)->format('H:i'),
                        'break_out' => $breakTime->break_out
                            ? Carbon::parse($breakTime->break_out)->format('H:i')
                            : null,
                    ];
                }),
                'is_attendance_edit_requested' => $isAttendanceEditRequested,
            ],
        ]);
    }
}
