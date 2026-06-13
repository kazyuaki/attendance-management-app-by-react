<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetUserAttendanceEditRequestListController extends Controller
{
    /**
     * ログインユーザーの勤怠修正申請一覧を取得
     */
    public function __invoke(Request $request)
    {
        $attendanceEditRequests = AttendanceEditRequest::with('attendance')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'requests' => $attendanceEditRequests->map(function ($attendanceEditRequest) {
                return [
                    'id' => $attendanceEditRequest->id,
                    'attendance_id' => $attendanceEditRequest->attendance_id,
                    'status' => $attendanceEditRequest->status,
                    'target_date' => $attendanceEditRequest->attendance->work_date,
                    'clock_in' => Carbon::parse($attendanceEditRequest->clock_in)->format('H:i'),
                    'clock_out' => Carbon::parse($attendanceEditRequest->clock_out)->format('H:i'),
                    'note' => $attendanceEditRequest->note,
                    'created_at' => $attendanceEditRequest->created_at->format('m/d H:i'),
                    'updated_at' => $attendanceEditRequest->updated_at->format('m/d H:i'),
                ];
            }),
        ]);
    }
}
