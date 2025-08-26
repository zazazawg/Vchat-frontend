import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit =async (data) => {
    console.log(data);
    try{
        await axios.post("http://localhost:8000/api/user/register",data,{withCredentials:true},{headers:{"Content-Type":"application/json"}})
        .then((res) => {
          console.log(res);
          
          if(res.data.message){
            toast.success(res.data.message);
            reset();
            navigate("/login");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
        
    }catch(err){
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/src/assets/tomato.jpg")' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered form */}
      <div className="relative flex justify-center items-center h-full">
        <div className="bg-white/30 backdrop-blur-xs rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Register
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-white mb-1" htmlFor="fullname">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                placeholder="Enter full name"
                {...register("fullname", { required: "Full name is required" })}
                className="w-full text-gray-400 placeholder:text-gray-400 px-4 py-2 rounded-lg bg-gray-200 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-white mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                {...register("username", { required: "Username is required" })}
                className="w-full text-gray-400 placeholder:text-gray-400 px-4 py-2 rounded-lg bg-gray-200 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-white mb-1" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                className="w-full text-gray-600 px-4 py-2 rounded-lg bg-gray-200 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-white mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
                className="w-full text-gray-400 placeholder:text-gray-400 px-4 py-2 rounded-lg bg-gray-200 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-center bg-red-400 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
            >
              Register
            </button>
            <span className="divider my-4">Or</span>

            {/* Login Link */}
            <div className="text-center">
              Already have an account?{" "}
              <a href="/login" className="text-red-400 hover:underline">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
