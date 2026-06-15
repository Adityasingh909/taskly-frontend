import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_BASE_URL;
function Register() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
       confirmPassword: ""
    })
    function changeHandler(event) {
        setFormdata({
            ...formdata,
            [event.target.name]: event.target.value
        })
    }


async function submitHandler(event) {
    event.preventDefault();

    try {
        // console.log(formdata);
        const response = await axios.post(
            `http://${BASE_URL}/api/v1/signup`,
            formdata
 
        );
        if(response.data.success){
            // console.log("Before navigate");
          toast.success("Account Created Successfully");
             localStorage.setItem("user",JSON.stringify(response.data.data));
            setUser(response.data.data);
            // console.log(response.data);
            navigate("/dashboard");
           
        }
        // console.log(response.data);
    }
    catch(error) {
        console.log(error);
          toast.error("Registration Failed");
    }
}


    return (
        <div>
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">

                <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">

                    <h1 className="text-3xl font-bold text-center mb-8">
                        Create Account
                    </h1>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            name='name'
                            value={formdata.name}
                            onChange={changeHandler}
                            className="w-full border px-4 py-3 rounded-lg"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            name='email'
                            value={formdata.email}
                            onChange={changeHandler}
                            className="w-full border px-4 py-3 rounded-lg"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            name='password'
                            value={formdata.password}
                            onChange={changeHandler}
                            className="w-full border px-4 py-3 rounded-lg"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name='confirmPassword'
                            value={formdata.confirmPassword}
                            onChange={changeHandler}
                            className="w-full border px-4 py-3 rounded-lg"
                        />

                        <button
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg cursor-alias hover:bg-indigo-500 "
                        type='submit'
                        >
                            Register
                        </button>

                    </form>
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?
                        <span className="text-indigo-600 cursor-pointer ml-1">
                            {/* Register */}


                            <Link to="/login">Login</Link>
                        </span>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Register