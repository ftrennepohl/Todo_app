<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Ramsey\Uuid\Type\Integer;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    Route::controller(TaskController::class)->group(function () {

        Route::get('/tasks', 'get')->name('tasks.index');
        Route::put('/tasks', 'update');
        Route::delete('/tasks/{id}', 'destroy');
        Route::post('/tasks', 'insert');

    });

    Route::controller(CategoryController::class)->group(function () {

        Route::get('/categories', 'get')->name('categories.index');
        Route::post('/categories', 'insert');
        Route::delete('/categories/{id}', 'destroy');

    });

});


require __DIR__.'/auth.php';