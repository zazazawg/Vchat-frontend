import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setOtherUsers, setAuthUser } from "../../redux/userSlice";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, otherUsers, selectedUser, onlineUsers } = useSelector((s) => s.user);

  useGetOtherUsers();

  const [search, setSearch] = useState("");
  const userRefs = useRef([]);
  userRefs.current = [];

  const scrollToUser = (index) => {
    if (userRefs.current[index]) {
      userRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/logout");
      toast.success(res.data.message);
      dispatch(setSelectedUser(null));
      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!otherUsers || otherUsers.length === 0) return;

    const foundUser = otherUsers.find((user) =>
      user?.username.toLowerCase().includes(search.toLowerCase())
    );

    if (!foundUser) {
      toast.error("User not found");
      return;
    }

    dispatch(setSelectedUser(foundUser));
    const index = otherUsers.findIndex(
      (user) => user.username === foundUser.username
    );
    scrollToUser(index);
    setSearch("");
  };

  // If no authUser, show placeholder message
  if (!authUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-600">
        <p className="mb-2">Let's start messaging!</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3">
      {/* Search Form */}
      <form className="flex gap-0.5" onSubmit={searchSubmitHandler}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border placeholder:text-gray-400 placeholder:ml-2 placeholder:p-1 p-1 rounded-md border-gray-200 flex-1"
          placeholder="Search users"
          type="text"
        />
        <button
          type="submit"
          className="p-2 hover:bg-gray-300 transition duration-300 rounded-full"
        >
          <IoIosSearch size={25} />
        </button>
      </form>

      {/* Other Users List */}
      <div className="mt-3 max-h-[450px] overflow-y-auto space-y-2 pr-2">
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers.map((user, index) => {
            const isOnline = onlineUsers.includes(user._id);

            return (
              <div
                key={user?.id || user?.username}
                ref={(el) => (userRefs.current[index] = el)}
                className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  user?.username === selectedUser?.username
                    ? "bg-white/40 backdrop-blur-md"
                    : "hover:bg-white/10 hover:backdrop-blur-md"
                }`}
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  scrollToUser(index);
                }}
              >
                <div className="flex shrink-0 relative items-center gap-3">
                  <div className="relative w-14 h-14">
                    <img
                      src={user?.profilePhoto}
                      alt={user?.username}
                      className="w-full h-full rounded-full object-cover transition-transform duration-300 transform hover:scale-110"
                    />
                    <span
                      className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                        isOnline ? "bg-green-500" : "bg-gray-400"
                      }`}
                    ></span>
                  </div>
                  <div>
                    <p className="font-medium">{user?.fullname}</p>
                    <p className="text-sm text-gray-500">@{user?.username}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-center mt-2">No users available</p>
        )}
      </div>

      {/* Logout */}
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


