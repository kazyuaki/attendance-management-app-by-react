<?php

use App\Http\Controllers\Admin\Auth\AdminLoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

// 管理者ログインルート
Route::middleware('web')->post('/admin/login', [AdminLoginController::class, 'login']);

// 認証された管理者ユーザーの情報を取得するルート
Route::middleware(['web', 'auth:admin'])->get('/admin/user', function (Request $request) {
    return response()->json([
        'admin_user' => $request->user('admin'),
    ]);
});

// 管理者ログアウトルート
Route::middleware(['web', 'auth:admin'])->post('/admin/logout', function (Request $request) {
    Auth::guard('admin')->logout();

    $request->session()->invalidate();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'ログアウトしました。',
    ]);
});