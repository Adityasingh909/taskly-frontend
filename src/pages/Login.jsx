import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

function Login() {
    const { setUser } = useContext(AuthContext);

    const navigate = useNavigate()
    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    })
    function changeHandler(event) {
        setFormData({
            ...formdata,
            [event.target.name]: event.target.value
        })
    }
    async function submitHandler(event) {
        event.preventDefault()
        try {
            console.log(formdata);
            const response = await axios.post(
                "http://localhost:3000/api/v1/login",
                formdata

            );
            if (response.data.success) {
                 toast.success("Login Successful");
                setUser(response.data.existing);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.existing)
                );

                localStorage.setItem(
                    "token",
                    response.data.token
                );
                // console.log(localStorage.getItem("token"));
                navigate("/dashboard");

            }

        }
        catch (error) {
            console.log(error)
            toast.error("Invalid data")
        }

    }
    return (
        <div>
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">

                <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 text-center mb-8">
                        Login to your account
                    </p>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-5">

                        <div>
                            <label className="block mb-2 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                name='email'
                                value={formdata.email}
                                onChange={changeHandler}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter password"
                                name='password'
                                value={formdata.password}
                                onChange={changeHandler}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            type='submit'
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?
                        <span className="text-indigo-600 cursor-pointer ml-1">
                            {/* Register */}


                            <Link to="/register">Register</Link>
                        </span>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Login