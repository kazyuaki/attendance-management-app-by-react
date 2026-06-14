<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreAttendanceEditRequestRequest;
use App\Models\Attendance;
use App\Models\AttendanceEditRequest;
use App\Services\User\Attendance\AttendanceEditRequestService;
use Illuminate\Http\JsonResponse;

class StoreAttendanceEditRequestController extends Controller
{
    /**
     * 勤怠修正申請を登録する
     */
    public function __invoke(
        StoreAttendanceEditRequestRequest $request,
        Attendance $attendance,
        AttendanceEditRequestService $attendanceEditRequestService,
    ): JsonResponse {
        if ($attendance->user_id !== $request->user()->id) {
            abort(403);
        }

        $attendanceEditRequestService->store(
            $attendance,
            $request->user(),
            $request->validated(),
        );

        return response()->json([
            'message' => '勤怠修正申請を送信しました。',
        ], 201);
    }
}
