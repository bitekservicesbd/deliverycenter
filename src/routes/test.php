<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/security-test', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'Test passed!',
        'data' => $request->all(),
    ]);
});
