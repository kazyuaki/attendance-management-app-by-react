<?php

namespace App\Services\User\Attendance;

use App\Models\Attendance;
use App\Models\AttendanceEditRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

class AttendanceEditRequestService
{
    /**
     * 勤怠修正申請を登録または再申請する
     */
    public function store(
        Attendance $attendance,
        User $user,
        array $data
    ): AttendanceEditRequest {
        return DB::transaction(function () use ($attendance, $user, $data) {
            $existsPendingRequest = AttendanceEditRequest::where('attendance_id', $attendance->id)
                ->where('user_id', $user->id)
                ->where('status', 'pending')
                ->exists();

            if ($existsPendingRequest) {
                throw new ConflictHttpException('承認待ちの申請があるため、修正できません。');
            }

            $rejectedRequest = AttendanceEditRequest::where('attendance_id', $attendance->id)
                ->where('user_id', $user->id)
                ->where('status', 'rejected')
                ->first();
            
            if ($rejectedRequest) {
                return $this->resubmit($rejectedRequest, $data);
            }

            return $this->create($attendance, $user, $data);
        });
    }

    /**
     * 新規申請を作成する
     */
    private function create(
        Attendance $attendance,
        User $user,
        array $data,
    ): AttendanceEditRequest {
        $attendanceEditRequest = AttendanceEditRequest::create([
            'attendance_id' => $attendance->id,
            'user_id' => $user->id,
            'clock_in' => $data['clock_in'],
            'clock_out' => $data['clock_out'],
            'note' => $data['note'],
            'status' => 'pending'
        ]);

        $this->createBreakTimes($attendanceEditRequest, $data['break_times'] ?? []);

        return $attendanceEditRequest;
    }

    /**
     * 差し戻し済み申請を再申請する
     */
    private function resubmit(
        AttendanceEditRequest $attendanceEditRequest,
        array $data,
    ): AttendanceEditRequest {
        $attendanceEditRequest->update([
            'clock_in' => $data['clock_in'],
            'clock_out' => $data['clock_out'],
            'note' => $data['note'],
            'status' => 'pending',
            'rejected_reason' => null
        ]);

        $attendanceEditRequest->breakTimes()->delete();

        $this->createBreakTimes($attendanceEditRequest, $data['break_times'] ?? []);

        return $attendanceEditRequest;
    }

    /**
     * 申請用の休憩時間を作成する
     */
    private function createBreakTimes(
        AttendanceEditRequest $attendanceEditRequest,
        array $breakTimes
    ): void {
        foreach ($breakTimes as $breakTime) {
            $attendanceEditRequest->breakTimes()->create([
                'break_in' => $breakTime['break_in'],
                'break_out' => $breakTime['break_out'] ?? null,
            ]);
        }
    }
}