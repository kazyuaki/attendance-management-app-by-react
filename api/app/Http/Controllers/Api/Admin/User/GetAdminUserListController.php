<?php

namespace App\Http\Controllers\Api\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;

class GetAdminUserListController extends Controller
{
    /**
     * 管理者用のユーザー　一覧取得
     */
    public function __invoke()
    {
        $users = User::query()
            ->select(['id', 'name', 'email'])
            ->orderBy('id')
            ->get();

        return response()->json([
            'message' => 'ユーザーの一覧を取得しました。',
            'users' => $users,
        ]);
    }
}
