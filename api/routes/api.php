<?php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
*/
Route::prefix('user')->group(function () {
    Route::middleware('web')->post('/register', [RegisteredUserController::class, 'store']);
    Route::middleware('web')->post('/login', [AuthenticatedSessionController::class, 'store']);  

    // Route::middleware('web', 'auth:sanctum')->post('/logout', LogoutUserController::class);  

    // Route::middleware(['web', 'auth'])->group(function () {
    //     Route::get('/me', GetUserController::class);
    //     Route::post('/logout', LogoutUserController::class);
    // });
});