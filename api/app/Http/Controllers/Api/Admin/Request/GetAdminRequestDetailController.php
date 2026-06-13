<?php

namespace App\Http\Controllers\Api\Admin\Request;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;
use Carbon\Carbon;

class GetAdminRequestDetailController extends Controller
{
    /**
     * 管理者用　ユーザー申請詳細を取得
     */
    public function __invoke(AttendanceEditRequest $attendanceEditRequest)
    {
        $attendanceEditRequest->load([
            'user',
            'attendance.breakTimes',
            'breakTimes'
        ]);

        return response()->json([
            'id' => $attendanceEditRequest->id,
            'status' => $attendanceEditRequest->status,
            'user_name' => $attendanceEditRequest->user->name,
            'target_date' => $attendanceEditRequest->attendance->work_date,

            'before' => [
                'clock_in' => $attendanceEditRequest->attendance->clock_in
                    ? Carbon::parse($attendanceEditRequest->attendance->clock_in)->format('H:i')
                    : null,
                'clock_out' => $attendanceEditRequest->attendance->clock_out
                    ? Carbon::parse($attendanceEditRequest->attendance->clock_out)->format('H:i')
                    : null,
                'break_times' => $attendanceEditRequest->attendance->breakTimes->map(function ($breakTime) {
                    return [
                        'id' => $breakTime->id,
                        'break_in' => $breakTime->break_in
                            ? Carbon::parse($breakTime->break_in)->format('H:i')
                            : null,
                        'break_out' => $breakTime->break_out
                            ? Carbon::parse($breakTime->break_out)->format('H:i')
                            : null,
                    ];
                }),
            ],

            'after' => [
                'clock_in' => $attendanceEditRequest->clock_in
                    ? Carbon::parse($attendanceEditRequest->clock_in)->format('H:i')
                    : null,
                'clock_out' => $attendanceEditRequest->clock_out
                    ? Carbon::parse($attendanceEditRequest->clock_out)->format('H:i')
                    : null,
                'break_times' => $attendanceEditRequest->breakTimes->map(function ($breakTime) {
                    return [
                        'id' => $breakTime->id,
                        'break_in' => $breakTime->break_in
                            ? Carbon::parse($breakTime->break_in)->format('H:i')
                            : null,
                        'break_out' => $breakTime->break_out
                            ? Carbon::parse($breakTime->break_out)->format('H:i')
                            : null,
                    ];
                }),
            ],

            'note' => $attendanceEditRequest->note,
            'created_at' => $attendanceEditRequest->created_at->format('m/d H:i'),
            'updated_at' => $attendanceEditRequest->updated_at->format('m/d H:i'),
        ]);
    }
}
