import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"; // Add useSelector here
import { useNavigate } from "react-router";
import { setAuthUser } from "../redux/userSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the user data from Redux store
  const user = useSelector((state) => state.user); // Replace 'user' with the correct slice name from your store

  console.log(user.authUser); // This will log the user data

  const onSubmit = async (data) => {
    try {
      await axios
        .post(
          "http://localhost:8000/api/user/login",
          data,
          { withCredentials: true },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((res) => {
          console.log(res.data.user); // user data from the response
          if (res.data.message) {
            toast.success(res.data.message);
            reset();
            dispatch(setAuthUser(res.data.user));
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/src/assets/tomato.jpg")' }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      {/* Centered form */}
      <div className="relative flex justify-center items-center h-full">
        <div className="bg-white/30 backdrop-blur-xs rounded-2xl shadow-xl p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            {/* Password */}
            <div>
              <label className="block text-white mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
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
              Login
            </button>
            <span className="divider my-4">Or</span>
            {/* Register Link */}
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-red-400 hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
