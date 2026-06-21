<?php

namespace App\Http\Controllers\Api\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class GetAdminUserAttendanceListController extends Controller
{
    /**
     * 管理者用　ユーザーの勤怠一覧を取得する
     */
    public function __invoke(Request $request, int $userId)
    {
        $user = User::findOrFail($userId);

        $month = $request->query('month', now()->format('Y-m'));

        $startOfMonth = Carbon::parse($month)->startOfMonth();
        $endOfMonth = Carbon::parse($month)->endOfMonth();

        $attendances = Attendance::with('breakTimes')
            ->where('user_id', $userId)
            ->whereBetween('work_date', [
                $startOfMonth->toDateString(),
                $endOfMonth->toDateString(),
            ])
            ->orderBy('work_date')
            ->get();

        return response()->json([
            'user' => $user,
            'attendances' => $attendances,
        ]);
    }
}
