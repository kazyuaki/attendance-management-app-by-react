<?php

namespace App\Http\Controllers\Api\Admin\Request;

use App\Http\Controllers\Controller;
use App\Models\AttendanceEditRequest;

class GetAdminRequestListController extends Controller
{
    /**
     * 管理者用　ユーザー申請一覧を取得
     */
    public function __invoke()
    {
        $attendanceEditRequests = AttendanceEditRequest::with([
            'user',
            'attendance',
            'breakTimes'
        ])
            ->latest()
            ->get();

        return response()->json(
            $attendanceEditRequests->map(function ($request) {
                return [
                    'id' => $request->id,
                    'status' => $request->status,
                    'user_name' => $request->user->name,
                    'target_date' => $request->attendance->work_date,
                    'note' => $request->note,
                    'created_at' => $request->created_at->format('m/d H:i'),
                    'updated_at' => $request->updated_at->format('m/d H:i'),
                ];
            })
        );
    }
}
