<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminLoginController extends Controller
{
    public function login(Request $request)
    {
        // 管理者のログイン情報を取得
        $credentials = $request->only('email', 'password');

        // 管理者ユーザーでの認証を試みる
        if (!Auth::guard('admin')->attempt($credentials)) {
            return response()->json([
                'message' => 'ログイン情報が正しくありません。'
            ], 401);
        }

        // 認証に成功した場合、セッションを再生成してセキュリティを強化
        $request->session()->regenerate();

        // ログイン成功のレスポンスを返す
        return response()->json([
            'message' => 'ログインに成功しました。',
            'admin_user' => Auth::guard('admin')->user(),
        ]);
    }
}
