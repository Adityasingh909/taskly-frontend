import React from 'react'
import ProfileDropdown from './ProfileDropdown'
import { useState } from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import profileImage from "../assets/image.png";
function Navbar({setCard,setEditTask,darkMode,setDarkMode}) {
    const { user } = useContext(AuthContext);
    const [isopen, setIsopen] = useState(false)
    
    // console.log(user);
    return (
        <div>
            <nav className="bg-white dark:bg-slate-800 shadow">
                {
                    isopen && <ProfileDropdown user={user}/>
                }
                <div className="max-w-7xl mx-auto px-6">

                    <div className="flex justify-between items-center h-16">

                        <h1 className="font-bold text-2xl text-indigo-600 dark:text-white">
                            TodoApp
                            
                        </h1>

                        <div className="flex items-center gap-6">

                            <button 
                            onClick={()=>{
                                
                                setEditTask(null);
                                 setCard(true);
                            }}
                            className="bg-indigo-600 text-white px-5 py-2 rounded-lg">
                                Add Todo
                            </button>

                            <img
                                // src="https://i.pravatar.cc/150"
                                src= {profileImage}
                                alt=""
                                className="w-10 h-10 rounded-full cursor-pointer"
                                onClick={() => { setIsopen(!isopen) }}
                            />
                            {/* <ProfileDropdown/> */}

                                <button
                                onClick={() => setDarkMode(!darkMode)} 
                                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white"
                                >
                                {darkMode ? "☀️" : "🌙"}
                                </button>
                        </div>

                    </div>

                </div>

            </nav>
        </div>
    )
}

export default Navbar