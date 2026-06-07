<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAttendanceEditRequestRequest;
use App\Models\Attendance;
use App\Models\AttendanceEditRequest;
use Illuminate\Http\JsonResponse;

class StoreAttendanceEditRequestController extends Controller
{
    /**
     * 勤怠修正申請を登録する
     */
    public function __invoke(
        StoreAttendanceEditRequestRequest $request,
        Attendance $attendance
    ) :JsonResponse {
        if ($attendance->user_id !== $request->user()->id) {
            abort(403);
        }

        $attendanceEditRequest = AttendanceEditRequest::create([
            'attendance_id' => $attendance->id,
            'user_id' => $request->user()->id,
            'clock_in' => $request->clock_in,
            'clock_out' => $request->clock_out,
            'note' => $request->note,
            'status' => 'pending',
        ]);

        foreach ($request->input('break_times', [])as $breakTime) {
            $attendanceEditRequest->breakTimes()->create([
                'break_in' => $breakTime['break_in'],
                'break_out' => $breakTime['break_out'] ?? null,
            ]);
        }

        return response()->json([
            'message' => '勤怠修正申請を送信しました。',
        ], 201);
    }
}
