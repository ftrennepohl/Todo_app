<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;


class CategoryController extends Controller
{
    public function getCategories():Response
    {
        return Inertia::render('Task/NewCategoryForm', [
            'categories' => DB::table('categories')->orderBy('created_at')->get()]);
    }

    public function insertCategory(Request $request):RedirectResponse
    {
        $category = new Category;
        $category->name = $request->input('name');
        $category->save();
        return to_route('categories.index');
    }

    public function updateCategory(Request $request):RedirectResponse
    {
        $category = Category::find($request->input('id'));
        $category->name = $request->input('name');
        $category->save();
        return to_route('categories.index', null, 303);
    }

    public function deleteCategory(Request $request):RedirectResponse
    {
        $category = Category::findOrFail($request->id);
        $category->delete();
        return to_route('categories.index', null, 303);
    }
}
