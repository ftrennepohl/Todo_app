import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react'
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Tasks(query) {
    
    const tasks = query['tasks']
    console.log(tasks)
    const categories = query['categories']

    const [updatedRowId, setUpdatedRowId] = useState(null);


    function saveUpdatedRow() {
        const updated_row = document.getElementById(updatedRowId).getElementsByTagName('textarea');
        const category_id = document.getElementById('update_category_select').value
        const updated_task = {
            id: updatedRowId,
            title: updated_row[0].value,
            descr: updated_row[1].value,
            situation: updated_row[2].value,
            deadline: updated_row[3].value,
            category_id: category_id,
        }     
        axios.put('tasks', updated_task
        ).then(() => {
            router.get('tasks', {}, {only: ['tasks'], preserveScroll: true});
            setUpdatedRowId(null);
        }).catch(function(error) {
            console.error(error);
        });
    }

    function deleteRow(id) {
        axios.delete('tasks/' + String(id)
        ).then(() => {
            router.get('tasks', {}, {only: ['tasks'], preserveScroll: true});
        }).catch(function(error) {
            console.error(error);
        });
    }

    function saveNewTask(){
        const new_row = document.getElementById('newTaskRow').getElementsByTagName('textarea')
        const category_id = document.getElementById('category_select').value
        const deadline = document.getElementById('due_date').value
        const new_task = {
            title: new_row[0].value,
            descr: new_row[1].value,
            situation: new_row[2].value,
            deadline: deadline,
            category_id: category_id,
        }
        axios.post('/tasks', new_task
        ).then(() => {
            router.get('tasks', {}, {preserveScroll: true});
        }).catch(function(error) {
            console.error(error);
        });
    }

    function TableHeader(){
        return(
            <thead>
                <tr className='bg-gray-700 text-white'>
                    <th className='py-4'>Title</th>
                    <th className='py-4'>Description</th>
                    <th className='py-4'>Situation</th>
                    <th className='py-4'>Deadline</th>
                    <th className='py-4' rowSpan={2}>Category</th>
                    <th className='py-4'>Actions</th>
                </tr>
            </thead>
        );
    }

    return (
        <AuthenticatedLayout>
            <div className='w-4/5 mx-auto overflow-x-auto py-4'>
                <h1 className='text-3xl font-bold p-4'>Tarefas</h1>
                <table className='table w-full my-10 bg-white'>
                    {
                        (tasks.length > 0) ? (
                            <TableHeader/>
                        ) : (
                        <></>
                        )
                    }
                    <tbody>
                        {tasks.map((task) => 
                            updatedRowId !== task.id ? (
                                <tr id={task.id} key={task.id} className='text-center odd:bg-white even:bg-gray-100'>
                                    <td className='py-4'>
                                        {task.title}
                                    </td>
                                    <td className='py-4'>
                                        {task.descr}
                                    </td>
                                    <td className='py-4'>
                                        {task.situation}
                                    </td>
                                    <td className='py-4'>
                                        {task.deadline}
                                    </td>
                                    <td className='py-4'>
                                        {task.name}
                                    </td>
                                    <td>
                                        {
                                            (updatedRowId === null) ? (
                                            <>
                                                <button className='w-40 bg-gray-700 text-white border-solid border-black border-2 text-white font-semibold my-1 p-2' onClick={() => setUpdatedRowId(task.id)}>Edit</button>
                                                <br/>
                                                <button className='w-40 bg-red-500 text-white border-solid border-black border-2 font-semibold my-1 p-2' onClick={() => deleteRow(task.id)}>Delete</button>
                                            </>
                                            ) : (
                                            <></>
                                            )
                                        }
                                        
                                    </td>
                                </tr>
                            ) : (
                                <tr id={task.id}  key={task.id} className='text-center'>
                                    <td>
                                        <textarea defaultValue={task.title}></textarea>
                                    </td>
                                    <td>
                                        <textarea defaultValue={task.descr}></textarea>
                                    </td>
                                    <td>
                                        <textarea defaultValue={task.situation}></textarea>
                                    </td>
                                    <td>
                                        <textarea defaultValue={task.deadline}></textarea>
                                    </td>
                                    <td className='text-center'>
                                        <select id='update_category_select' className='my-2' defaultValue={task.category_id}>
                                            {categories.map((category) => 
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                            )}
                                        </select>
                                    </td>
                                    <td>
                                        <button className='w-40 bg-gray-700 text-white border-solid border-black border-2 text-white font-semibold my-1 p-2' onClick={saveUpdatedRow}>Save</button>
                                        <br />
                                        <button className='w-40 bg-red-500 text-white border-solid border-black border-2 font-semibold my-1 p-2' onClick={() => setUpdatedRowId(null)}>Cancel</button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                    <tfoot>
                        <tr className='border-t-2 border-black border-1 border-dotted'>
                        <th>Title</th>
                            <th className='py-4'>Description</th>
                            <th className='py-4'>Situation</th>
                            <th className='py-4'>Deadline</th>
                            <th className='py-4'>Category
                            </th>
                            <th>Actions</th>
                            
                        </tr>
                        <tr id='newTaskRow' className='text-center'>
                            <td className='py-4'>
                                <textarea></textarea>
                            </td>
                            <td>
                                <textarea></textarea>
                            </td>
                            <td>
                                <textarea></textarea>
                            </td>
                            <td>
                                <input id='due_date' type='datetime-local'/>
                            </td>
                            <td>
                                <select id='category_select'>
                                    {categories.map((category) => 
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                    )}
                                </select>
                            </td>
                            <td>
                                <button className='w-40 bg-gray-700 text-white border-solid border-black border-2 text-white font-semibold my-1 p-2' onClick={saveNewTask}>Save</button>
                                <br/>
                                <Link className='inline-block w-40 bg-gray-700 text-white border-solid border-black border-2 text-white font-semibold my-1 p-2' href="categories">New category</Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
