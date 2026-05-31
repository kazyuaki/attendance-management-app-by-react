<?php

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
    // ログインユーザー取得
    Route::middleware(['web', 'auth:sanctum', 'verified'])
        ->get('/me', function (Request $request) {
            return response()->json($request->user());
        });

    // メール認証
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
