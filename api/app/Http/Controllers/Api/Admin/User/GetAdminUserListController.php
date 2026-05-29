<?php 

namespace App\Http\Controllers\Api\Admin\User;

use App\Http\Controllers\Controller;
use App\Models\User;

/**
 * 管理者用のユーザー一覧取得コントローラー
 */
class GetAdminUserListController extends Controller
{
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