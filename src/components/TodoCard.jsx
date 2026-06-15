import React from 'react'

function Todocard({ task, deletetask,setEditTask,setCard }) {
    console.log(task);

    return (
        <div>
            <div className="bg-white rounded-2xl p-5 shadow">

                <div className="flex justify-between items-start">

                    <h2 className="font-bold text-xl">
                        {/* Complete MERN Project */}
                        {task.title}
                    </h2>

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                        {/* Completed */}
                        {task.status}
                    </span>

                </div>

                <p className="text-gray-600 mt-4">
                    {/* Build authentication and todo CRUD. */}
                    {task.content}
                </p>

                <div className="flex gap-3 mt-6">

                    <button
                        onClick={() => {
                            setEditTask(task);
                            setCard(true);
                        }}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
                        Edit
                    </button>

                    <button
                        onClick={() => deletetask(task._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg">

                        Delete
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Todocard