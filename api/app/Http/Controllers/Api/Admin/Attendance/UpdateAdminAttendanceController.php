<?php

namespace App\Http\Controllers\Api\Admin\Attendance;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Attendance\UpdateAdminAttendanceRequest;
use App\Models\Attendance;
use App\Services\Admin\Attendance\UpdateAdminAttendanceService;

class UpdateAdminAttendanceController extends Controller
{
    public function __construct(
        private readonly UpdateAdminAttendanceService $service
    ) {}

    /**
     * 勤怠更新
     */
    public function __invoke(UpdateAdminAttendanceRequest $request, Attendance $attendance)
    {
        $this->service->update($attendance, $request->validated());

        return response()->json([
            'message' => '勤怠情報が更新されました。',
        ]);
    }
}
