import { useState } from 'react';
import axios from 'axios';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function NewCategoryForm(query) {

    const categories = query['categories']

    function saveCategory() {
        const new_category_name = document.getElementById('new_category_name').value;
        axios.post('categories', {
            name: new_category_name
        }).then(() => {
            router.get('categories', {}, {only: ['categories'], preserveScroll: true});
        }).catch(function(error) {
            console.error(error)
        });

    }

    function deleteCategory(id) {
        console.log(id)
        axios.delete('/categories/' + String(id)
        ).then(() => {
            router.get('categories', {}, {only: ['categories'], preserveScroll: true});
        }) .catch(function (error) {
            console.error(error)
          });
    }

    function TableHeader() {
        return(
        <thead>
            <tr className='bg-gray-700 text-white'>
                <th className='py-4'>Category</th>
                <th className='py-4'>Actions</th>
            </tr>
        </thead>
        );
}

    return(
        <AuthenticatedLayout>
            <div className='w-4/5 mx-auto overflow-x-auto py-4'>
                <h1 className='text-3xl font-bold p-4'>Categories</h1>
                <table className='table w-full my-10 bg-white'>
                    {
                        (categories.length > 0) ? (
                            <TableHeader/>
                        ) : (
                        <></>
                        )
                    }
                    <tbody>
                        {
                            categories.map((category) =>
                                <tr key={category.id} className='text-center odd:bg-white even:bg-gray-100'>
                                    <td className='py-4'>
                                        {category.name}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteCategory(category.id)} className='w-40 bg-red-500 text-white border-solid border-black border-2 text-white font-semibold p-2'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr className='border-t-2 border-black border-1 border-dotted'>
                            <th className='py-4'>
                                New category
                            </th>
                        </tr>
                        <tr className='text-center'>
                            <td className='py-4'>
                                <input id='new_category_name' type='text'></input>
                            </td>
                            <td>
                                <button onClick={saveCategory} className='w-40 bg-gray-700 text-white border-solid border-black border-2 text-white font-semibold p-2'>
                                    Save
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <Link href='/tasks' className='w-40 bg-gray-700 text-white border-solid border-black border-2 font-semibold p-2'>Back</Link>
            </div>
        </AuthenticatedLayout>
    )
}