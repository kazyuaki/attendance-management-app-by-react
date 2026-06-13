<?php

use App\Http\Controllers\Admin\Auth\AdminLoginController;
use App\Http\Controllers\Api\Admin\Attendance\GetAdminAttendanceDetailController;
use App\Http\Controllers\Api\Admin\Attendance\GetAttendanceListController;
use App\Http\Controllers\Api\Admin\Attendance\UpdateAdminAttendanceController;
use App\Http\Controllers\Api\Admin\Request\ApproveAttendanceEditRequestController;
use App\Http\Controllers\Api\Admin\Request\GetAdminRequestDetailController;
use App\Http\Controllers\Api\Admin\Request\GetAdminRequestListController;
use App\Http\Controllers\Api\Admin\Request\RemandAttendanceEditRequestController;
use App\Http\Controllers\Api\Admin\User\GetAdminUserAttendanceListController;
use App\Http\Controllers\Api\Admin\User\GetAdminUserListController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    // 管理者ログイン
    Route::middleware('web')->post(
        '/login',
        [AdminLoginController::class, 'login']
    );

    // 認証済み管理者ルート
    Route::middleware(['web', 'auth:admin'])->group(function () {
        // 管理者ユーザー情報取得
        Route::get('/user', function (Request $request) {
            return response()->json([
                'admin_user' => $request->user('admin'),
            ]);
        });

        // 管理者ログアウト
        Route::post('/logout', function (Request $request) {
            Auth::guard('admin')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json([
                'message' => 'ログアウトしました。',
            ]);
        });

        // 勤怠一覧取得
        Route::get('/get-attendance-list', GetAttendanceListController::class);

        // 勤怠詳細取得
        Route::get('/get-attendance-detail/{attendance}', GetAdminAttendanceDetailController::class);

        // 勤怠更新
        Route::put('/attendances/{attendance}', UpdateAdminAttendanceController::class);

        // スタッフ一覧取得
        Route::get('/get-user-list', GetAdminUserListController::class);

        // スタッフ月次勤怠一覧取得
        Route::get('/users/{userId}/get-user-attendance-list', GetAdminUserAttendanceListController::class);

        // スタッフ申請一覧取得
        Route::get('/get-admin-request-list', GetAdminRequestListController::class);

        // スタッフ申請詳細取得
        Route::get('/get-admin-request-detail/{attendanceEditRequest}', GetAdminRequestDetailController::class);

        // スタッフ申請承認
        Route::post('/requests/{attendanceEditRequest}/approve', ApproveAttendanceEditRequestController::class);

        // スタッフ申請差し戻し
        Route::post('/requests/{attendanceEditRequest}/remand', RemandAttendanceEditRequestController::class);
    });
});
