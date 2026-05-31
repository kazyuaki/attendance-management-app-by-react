<?php

namespace App\Http\Controllers\Api\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;

class GetAdminUserAttendanceListController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(int $userId)
    {
        $user = User::findOrFail($userId);

        $attendances = Attendance::with('breakTimes')
            ->where('user_id', $userId)
            ->orderBy('work_date')
            ->get();

        return response()->json([
            'user' => $user,
            'attendances' => $attendances,
        ]);
    }
}
