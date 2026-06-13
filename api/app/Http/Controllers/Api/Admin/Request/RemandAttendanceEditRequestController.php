<?php

namespace App\Http\Controllers\Api\Admin\Request;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Attendance\RemandAttendanceEditRequestRequest;
use App\Models\AttendanceEditRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RemandAttendanceEditRequestController extends Controller
{
    public function __invoke(
        AttendanceEditRequest $attendanceEditRequest,
        RemandAttendanceEditRequestRequest $request
    ): JsonResponse {
        $attendanceEditRequest->update([
            'status' => 'rejected',
            'rejected_reason' => $request->rejected_reason,
        ]);

        return response()->json([
            'message' => '修正申請を差し戻しました。'
        ]);
    }
}