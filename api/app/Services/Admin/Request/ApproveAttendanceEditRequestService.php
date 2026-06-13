<?php

namespace App\Services\Admin\Request;

use App\Models\Attendance;
use App\Models\AttendanceEditRequest;
use Illuminate\Support\Facades\DB;

class ApproveAttendanceEditRequestService
{
    /**
     * 申請承認処理
     */
    public function execute(AttendanceEditRequest $attendanceEditRequest): void
    {
        DB::transaction(function () use ($attendanceEditRequest) {
            if ($attendanceEditRequest->status !== 'pending') {
                abort(422, '承認待ちの申請ではありません');
            }

            $attendance = Attendance::findOrFail($attendanceEditRequest->attendance_id);

            $attendance->update([
                'clock_in' => $attendanceEditRequest->clock_in,
                'clock_out' => $attendanceEditRequest->clock_out,
                'note' => $attendanceEditRequest->note,
            ]);

            $attendance->breakTimes()->delete();

            foreach ($attendanceEditRequest->breakTimes as $breakTime) {
                $attendance->breakTimes()->create([
                    'break_in' => $breakTime->break_in,
                    'break_out' => $breakTime->break_out,
                ]);
            }

            $attendanceEditRequest->update([
                'status' => 'approved'
            ]);
        });
    }
}

   
