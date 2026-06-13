<?php

namespace App\Http\Controllers\Api\Admin\Request;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;

class GetAdminRequestDetailController extends Controller
{
    /**
     * 管理者用　ユーザー申請詳細を取得
     */
    public function __invoke(AttendanceEditRequest $attendanceEditRequest)
    {
        $attendanceEditRequest->load([
            'user',
            'attendance',
            'breakTimes'
        ]);

        return response()->json([
            'id' => $attendanceEditRequest->id,
            'status' => $attendanceEditRequest->status,
            'user_name' => $attendanceEditRequest->user->name,
            'target_date' => $attendanceEditRequest->attendance->work_date,
            'clock_in' => $attendanceEditRequest->clock_in,
            'clock_out' => $attendanceEditRequest->clock_out,
            'break_times' => $attendanceEditRequest->breakTimes->map(function ($breakTime) {
                return [
                    'id' => $breakTime->id,
                    'break_in' => $breakTime->break_in,
                    'break_out' => $breakTime->break_out,
                ];
            }),
            'note' => $attendanceEditRequest->note,
            'created_at' => $attendanceEditRequest->created_at->format('m/d H:i'),
            'updated_at' => $attendanceEditRequest->updated_at->format('m/d H:i'),
        ]);
    }
}
