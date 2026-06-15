import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
function ProfileDropdown({user}) {
const { setUser } = useContext(AuthContext);
const navigate = useNavigate();
// console.log(user);
function logoutHandler(){

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);
     toast.success("Logged Out Successfully");
    navigate("/login");

}
    return (
        <div>
            
            <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-lg">

                <div className="p-4 border-b">

                    <h3 className="font-semibold">
                        {/* Aditya Singh */}
                        {user?.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {/* aditya@gmail.com */}
                        {user?.email}
                    </p>

                </div>

                <div className="p-2">

                    {/* <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                        Profile
                    </button>

                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                        Settings
                    </button> */}

                    <button 
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500 rounded-lg">
                        Logout
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProfileDropdown