import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const api_url = "http://localhost:3000/api"

const Signin = ({ location }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const response = await fetch(`${api_url}/user/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email, 
                password: form.password, 
            }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || "Failed to verify user");
        }

        console.log(data)

        sessionStorage.setItem("token",data.data.token)

        alert(data.message);

        navigate("/dashboard");
    }catch(err){
        console.error(err)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-160 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full bg-black text-white py-2 rounded-md cursor-pointer hover:bg-black transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
            <span className="mr-3">Don't have an account?</span>
            <Link to="/signup" className="font-semibold hover:underline">
                Sign Up
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
