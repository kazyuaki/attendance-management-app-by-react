<?php

use App\Http\Controllers\Api\User\Attendance\ClockInController;
use App\Http\Controllers\Api\User\Attendance\GetTodayAttendanceController;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/
Route::prefix('user')->group(function () {
    // 会員登録
    Route::middleware('web')->post('/register', [RegisteredUserController::class, 'store']);
    // ログイン
    Route::middleware('web')->post('/login', [AuthenticatedSessionController::class, 'store']);
    // ログアウト
    Route::middleware(['web', 'auth:sanctum'])
        ->post('/logout', [AuthenticatedSessionController::class, 'destroy']); 

    // 認証済みユーザー向け
    Route::middleware(['web', 'auth:sanctum', 'verified'])->group(function () {
        // ログインユーザー取得
        Route::get('/me', function (Request $request) {
                return response()->json($request->user());
            });
        // 今日の勤怠取得
        Route::get('/attendance/today', GetTodayAttendanceController::class);
        // 勤怠打刻
        Route::post('/attendance/clock-in', ClockInController::class);

    });


    // メール認証再送
    Route::middleware(['web', 'auth:sanctum'])
        ->post('/email/verification-notification', function (Request $request) {
            if ($request->user()->hasVerifiedEmail()) {
                return response()->json([
                    'message' => '既にメール認証済みです。',
                ]);
            }
            $request->user()->sendEmailVerificationNotification();
            return response()->json([
                'message' => '認証メールを再送しました。',
            ]);
        });

});
