<?php

namespace App\Http\Controllers\Api\Admin\Request;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;
use App\Services\Admin\Request\ApproveAttendanceEditRequestService;

class ApproveAttendanceEditRequestController extends Controller
{
    /**
     * 申請承認処理
     */
    public function __invoke(
        AttendanceEditRequest $attendanceEditRequest,
        ApproveAttendanceEditRequestService $service,
    ){
        $service->execute($attendanceEditRequest);

        return response()->json([
            'message' => '申請を承認しました。'
        ]);
    }
}
