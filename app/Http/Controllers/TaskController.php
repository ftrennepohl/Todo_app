<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Enums\Situations;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function get():Response
    {
        return Inertia::render('Task/Tasks', [
            'tasks' => DB::table('tasks')
            ->join('categories', 'tasks.category_id', '=', 'categories.id')
            ->select(
            'tasks.id',
            'tasks.title',
            'tasks.descr',
            'tasks.situation',
            'tasks.deadline',
            'tasks.category_id',
            'categories.name')
            ->where('user_id', '=', Auth::id())
            ->orderBy('tasks.created_at')
            ->get(),
            'categories' => Category::all()
        ]);
    }

    public function insert(Request $request):RedirectResponse
    {
        $request->validate([
            'titulo'        => 'min:5',
            'situacao'      => [Rule::enum(Situations::class)],
            'data_limite'   => 'after:' . Carbon::now()->format('Y-m-d\TH:i')
        ]);
        $task = new Task;
        $task->title = $request->input('title');
        $task->descr = $request->input('descr');
        $task->situation = $request->input('situation');
        $task->deadline = $request->input('deadline');
        $task->category_id = $request->input('category_id');
        $task->user_id = Auth::id();
        $task->save();
        return to_route('tasks.index');
    }

    public function update(Request $request):RedirectResponse
    {
        $task = Task::find($request->input('id'));
        $task->id = $request->input('id');
        $task->title = $request->input('title');
        $task->descr = $request->input('descr');
        $task->situation = $request->input('situation');
        $task->deadline = $request->input('deadline');
        $task->category_id = $request->input('category_id');
        $task->save();
        return to_route('tasks.index', null, 303);
    }

    public function destroy(Request $request):RedirectResponse
    {
        $task = Task::findOrFail($request->id);
        $task->delete();
        return to_route('tasks.index', null, 303);
    }
}
