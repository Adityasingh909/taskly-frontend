import React from 'react'
import Todocard from '../components/Todocard'
import Navbar from '../components/Navbar'
import { useState,useEffect } from 'react'
import axios from 'axios'
import TodoModal from '../components/TodoModal'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_BASE_URL;
 
function Dashboard({ darkMode, setDarkMode }) {
    const [task,setTask]= useState([])
    const [card, setCard] = useState(false);
    const [editTask, setEditTask] = useState(null);

    const deletetask = async(id) => {
        //   console.log("Deleting:", id);
        try {
        const token = localStorage.getItem("token")
        await axios.delete(
           
            `http://${BASE_URL}/api/v1/deletetask/${id}`
            ,
            {
                headers:{
                        Authorization:  `Bearer ${token}`
                    }
            }
        );

        setTask(task.filter((item) => item._id !== id));
        toast.success("Task deleted")
    }
    catch(error){

        console.log(error);
        toast.error("Task not deleted")

    }

}
    async function fetchTask(){
        try{
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://${BASE_URL}/api/v1/tasks`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            console.log(response.data.data);
            
            setTask(response.data.data)

        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchTask()
    },[])

    return (
        <div>
            <Navbar fetchTask={fetchTask} setCard={setCard} card={card} setEditTask ={setEditTask} darkMode ={darkMode} setDarkMode={setDarkMode}/>
            {card && (
        <TodoModal
            setCard={setCard}
            fetchTask={fetchTask}
            task={editTask}

        />
    )}
           <div className="min-h-screen bg-slate-100 dark:bg-slate-900">

                <div className="max-w-7xl mx-auto p-6">

                    <div className="flex justify-between items-center mb-8">

                        <div>
                            <h1 className="text-3xl font-bold dark:text-white">
                                My Todos
                            </h1>

                            <p className="text-gray-500">
                                Manage your daily tasks
                            </p>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Todo Cards Here */}
                        
                     {
                        task.map((todo)=>(
                            <Todocard
                             key={todo._id}
                                task={todo}
                                deletetask={deletetask}
                               setEditTask={setEditTask}
                               setCard={setCard}
                            />
                        ))
                     }

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard