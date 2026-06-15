import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
function TodoModal({setCard,fetchTask,task}) {
    const [tododata,setTododata]= useState({
        title : task?.title || "",
        content: task?.content || "",
        status : task?.status ||  "Pending"
    })

    function clickHandler(event){
        setTododata({
            ...tododata,
            [event.target.name] : event.target.value
        })
    }

    async function submitHandler(event){
         event.preventDefault();
        try{
            const token = localStorage.getItem("token");
                console.log(tododata);
                let response;
                if(task){
                   response = await axios.put(
                         `http://localhost:3000/api/v1/updatetask/${task._id}`,
                        tododata,
                        {
                            headers:{
                                Authorization:  `Bearer ${token}`
                            }
                        }
                );
                toast.success("Task updated ")
                }
                else{

                    response = await axios.post(
                        "http://localhost:3000/api/v1/addtask",
                        tododata,
                        {
                            headers:{
                                Authorization:  `Bearer ${token}`
                            }
                        }
                    )
                    toast.success("Task created");
                }
            // console.log(response.data.success);
            
            if(response.data.success){
                  console.log("fetching tasks again");
                  fetchTask();     
                    setCard(false)

            }


                
        }
        catch(error){
            console.log(error);
            
            
        }
    }
    return (
        <div>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                <div className="bg-white w-full max-w-lg rounded-2xl p-8">

                    <h2 className="text-2xl font-bold mb-6">
                      {task ? "Edit Todo" : "Create Todo"}
                    </h2>
 
                    <form
                    onSubmit={submitHandler}
                     className="space-y-5">

                        <input
                            type="text"
                            placeholder="Todo Title"
                            name='title'
                            value={tododata.title}
                            onChange={clickHandler}
                            className="w-full border rounded-lg px-4 py-3"
                        />

                        <textarea
                            rows="4"
                            placeholder="Description"
                            name='content'
                            value={tododata.content}
                            onChange={clickHandler}
                            className="w-full border rounded-lg px-4 py-3"
                        /> 

                        <select
                        name='status'
                        value={tododata.status}
                        onChange={clickHandler}
                         className="w-full border rounded-lg px-4 py-3">

                            <option  value="Pending">Pending</option>

                            <option value="Completed">Completed</option>

                        </select>

                        <div className="flex justify-end gap-3">

                            <button 
                            type='button'
                            onClick={()=>setCard(false)}
                            className="border px-5 py-2 rounded-lg">
                                Cancel
                            </button>
                            
                            <button
                            type='submit'

                             className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
                                Save
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default TodoModal