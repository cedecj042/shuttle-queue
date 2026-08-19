<?php

use App\Http\Controllers\GameSessionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('session.')->group(function () {
    Route::get('/', [GameSessionController::class, 'index'])->name('index');
    Route::post('/', [GameSessionController::class, 'store'])->name('store');
    Route::get('/{session}', [GameSessionController::class, 'show'])->name('show');
    Route::put('/{session}', [GameSessionController::class, 'update'])->name('update');
    Route::delete('/{session}', [GameSessionController::class, 'destroy'])->name('destroy');
});
