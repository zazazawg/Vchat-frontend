import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const OtherUsers = () => {
  const dispatch = useDispatch();

  // Get users from the redux store
  const { otherUsers, selectedUser } = useSelector((store) => store.user);

  // Custom hook for getting other users (ensure it is not causing side-effects)
  useGetOtherUsers();

  // Handle selecting a user
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  if (!otherUsers) return null; // If no users, return nothing

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 mb-2"> Users</h3>

      {/* Scrollable container for users */}
      <div className="max-h-[450px] overflow-y-auto pr-2 space-y-2">
        {otherUsers.map((user, index) => (
          <div
            onClick={() => selectedUserHandler(user)}
            key={index}
            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedUser?.username === user.username
                ? "bg-white/40 backdrop-blur-md"
                : "hover:bg-white/10 hover:backdrop-blur-md"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={user.profilePhoto}
                  alt={user.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              {/* Name and username */}
              <div>
                <p className="font-medium">{user.fullname}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherUsers;
