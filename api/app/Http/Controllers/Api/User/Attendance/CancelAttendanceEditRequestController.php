<?php

namespace App\Http\Controllers\Api\User\Attendance;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;
use App\Services\User\Attendance\AttendanceEditRequestService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CancelAttendanceEditRequestController extends Controller
{
    /**
     * 申請キャンセル
     */
    public function __invoke(
        Request $request,
        AttendanceEditRequest  $attendanceEditRequest,
        AttendanceEditRequestService $attendanceEditRequestService,
    ): JsonResponse {
        $attendanceEditRequestService->cancel(
            $attendanceEditRequest,
            $request->user(),
        );

        return response()->json([
            'message' => '勤怠修正申請を取り下げました。'
        ]);
    }
}