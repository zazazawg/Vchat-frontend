import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers, selectedUser } = useSelector((s) => s.user);  // Select selectedUser from Redux store
  const [search, setSearch] = useState("");

  // Refs to store references to each user item
  const userRefs = useRef([]);
  userRefs.current = [];

  // Function to scroll to the selected user
  const scrollToUser = (index) => {
    if (userRefs.current[index]) {
      userRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Function to handle logout
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/logout");
      toast.success(res.data.message);
      dispatch(setSelectedUser(null));
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Function to handle search submit
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    const otherUser = otherUsers.find((user) =>
      user?.username.toLowerCase().includes(search.toLowerCase())
    );

    if (!otherUser) {
      toast.error("User not found");
      return;
    }

    // Dispatch the selected user
    dispatch(setSelectedUser(otherUser));

    // Scroll to the user in the list
    const index = otherUsers.findIndex(
      (user) => user.username === otherUser.username
    );
    scrollToUser(index);

    setSearch(""); // Clear the search input after submitting
  };

  return (
    <div className="f">
      <div>
        <form className="flex gap-0.5" onSubmit={searchSubmitHandler}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border placeholder:text-gray-100 placeholder:ml-2 placeholder:p-1 p-1 rounded-md border-gray-200"
            placeholder="Search"
            type="text"
            name="Search"
          />
          <button
            type="submit"
            className="p-2 hover:bg-gray-300 transition duration-300 rounded-full"
          >
            <IoIosSearch size={25} />
          </button>
        </form>
      </div>

      <div className="mt-3">
        {/* Display Other Users */}
        <div className="max-h-[450px] overflow-y-auto pr-2 space-y-2">
          {otherUsers.map((user, index) => (
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
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={user?.profilePhoto}
                    alt={user?.username}
                    className="w-14 h-14 rounded-full object-cover transition-all duration-300 transform hover:scale-110"
                  />
                </div>
                {/* Name and username */}
                <div>
                  <p className="font-medium">{user?.fullname}</p>
                  <p className="text-sm text-gray-500">@{user?.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
