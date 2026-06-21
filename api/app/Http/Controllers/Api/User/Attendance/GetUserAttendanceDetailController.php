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

        $latestAttendanceEditRequest = AttendanceEditRequest::with('breakTimes')
            ->where('attendance_id', $attendance->id)
            ->where('user_id', $request->user()->id)
            ->latest()
            ->first();
        $cancelableAttendanceEditRequest = AttendanceEditRequest::where('attendance_id', $attendance->id)
            ->where('user_id', $request->user()->id)
            ->whereIn('status', ['pending', 'rejected'])
            ->latest()
            ->first();

        $isRejected = $latestAttendanceEditRequest?->status === 'rejected';
        $isCancelable = $cancelableAttendanceEditRequest !== null;
        $displayBreakTimes = $isRejected
            ? $latestAttendanceEditRequest->breakTimes
            : $attendance->breakTimes;
        $displayClockIn = $isRejected
            ? $latestAttendanceEditRequest->clock_in
            : $attendance->clock_in;
        $displayClockOut = $isRejected
            ? $latestAttendanceEditRequest->clock_out
            : $attendance->clock_out;
        $displayNote = $isRejected
            ? $latestAttendanceEditRequest->note
            : $attendance->note;

        $isAttendanceEditRequested = AttendanceEditRequest::where('attendance_id', $attendance->id)
            ->whereIn('status', ['pending', 'approved'])
            ->exists();

        return response()->json([
            'attendance' => [
                'id' => $attendance->id,
                'user_name' => $request->user()->name,
                'work_date' => Carbon::parse($attendance->work_date)->format('Y年n月j日'),
                'clock_in' => Carbon::parse($displayClockIn)->format('H:i'),
                'clock_out' => $displayClockOut
                    ? Carbon::parse($displayClockOut)->format('H:i')
                    : null,
                'note' => $displayNote,
                'break_times' => $displayBreakTimes->map(function ($breakTime) {
                    return [
                        'id' => $breakTime->id,
                        'break_in' => Carbon::parse($breakTime->break_in)->format('H:i'),
                        'break_out' => $breakTime->break_out
                            ? Carbon::parse($breakTime->break_out)->format('H:i')
                            : null,
                    ];
                }),
                'is_attendance_edit_requested' => $isAttendanceEditRequested,
                'attendance_edit_request_id' => $cancelableAttendanceEditRequest?->id,
                'is_attendance_edit_request_cancelable' => $isCancelable,
                'rejected_reason' => $isRejected
                    ? $latestAttendanceEditRequest->rejected_reason
                    : null,
            ],
        ]);
    }
}
