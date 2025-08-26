import React from "react";

// Temporary mock data with avatar URLs
const users = [
  { id: 1, name: "John Doe", username: "johnny", avatar: "https://i.pravatar.cc/40?img=1" },
  { id: 2, name: "Jane Smith", username: "janes", avatar: "https://i.pravatar.cc/40?img=2" },
  { id: 3, name: "Alice Brown", username: "alice", avatar: "https://i.pravatar.cc/40?img=3" },
];

const OtherUsers = () => {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-700 mb-2">Other Users</h3>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-2 rounded-md hover:bg-gray-300 cursor-pointer transition"
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Name and username */}
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherUsers;
