import React from "react";
import { IoIosSearch } from "react-icons/io";
import OtherUsers from "../../components/OtherUsers";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/logout");
      toast.success(res.data.message);
      navigate("/login"); // This ensures that after logout, user will be redirected to the login page
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="f">
      <div className="  ">
        <form className="flex gap-0.5" action="">
          <input
            className="border placeholder:text-gray-100 placeholder:ml-2 placeholder:p-1 p-1 rounded-md border-gray-200"
            placeholder="Search"
            type="text"
            name="Search"
          />
          <button className="p-2 hover:bg-gray-300 transition duration-300 rounded-full">
            <IoIosSearch size={25} />
          </button>
        </form>
      </div>
      <div className="mt-3">
        <OtherUsers />
      </div>
      <button
        onClick={logoutHandler}
        className="p-1 rounded-full transition mt-5 hover:text-red-400 tooltip"
        data-tip="Logout"
        aria-label="Logout"
      >
        <IoLogOutOutline size={22} />
      </button>
    </div>
  );
};

export default Sidebar;
