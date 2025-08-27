import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMessages } from "../../redux/messageSlice";
import { setSelectedUser } from "../../redux/userSlice";

const formatTime = (iso) => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const normalizeId = (val) => {
  if (!val) return undefined;
  if (typeof val === "string" || typeof val === "number")
    return String(val).trim();
  return String(val._id ?? val.id ?? "").trim();
};

const MessageContainer = () => {
  useGetMessages();
  const messages = useSelector((s) => s.message?.messages) ?? [];
  const authUser = useSelector((s) => s.user?.authUser);
  const selectedUser = useSelector((s) => s.user.selectedUser);

  const currentUserId = useMemo(() => {
    return normalizeId(
      authUser?.userId ?? authUser?.id ?? authUser?.user?._id ?? authUser?.user?.id
    );
  }, [authUser]);

  const [input, setInput] = useState("");
  const listRef = useRef(null); 
  const lastMessageRef = useRef(null); 

  
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/message/sendMessage/${selectedUser._id}`,
        { message: text },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message) {
        toast.success(res.data.message);
        dispatch(setMessages([...messages, res.data.newMessage]));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      console.log(err);
    }
  };

  // Clear the selected user on component unmount or logout
  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null)); 
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="py-4 border-b flex items-center justify-between flex-shrink-0">
        {selectedUser && (
          <div className="flex items-center">
            <img
              src={selectedUser.profilePhoto}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold">{selectedUser.fullname}</p>
              <p className="font-semibold text-gray-300 text-sm">
                {selectedUser.username}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 min-h-0 overflow-y-auto px-1 py-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => {
            const senderIdNorm = normalizeId(msg.senderId);
            const mine =
              currentUserId && senderIdNorm
                ? senderIdNorm === currentUserId
                : false;

            return (
              <div key={normalizeId(msg) || msg._id || msg.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                {/* For my messages (logged-in user) show profile pic on the right */}
                <div className="flex items-center gap-3">
                  {/* Profile image of the other user (left side for others) */}
                  {!mine && (
                    <img
                      src={selectedUser?.profilePhoto}
                      alt="avatar"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  )}
                  {/* Message bubble */}
                  <div
                    className={`max-w-xs p-3 rounded-lg shadow ${
                      mine
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    <span
                      className={`mt-1 block text-[10px] opacity-80 ${
                        mine ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </span>
                  </div>
                  {/* Profile image of the logged-in user (right side for self) */}
                  {mine && (
                    <img
                      src={authUser?.profilePhoto}
                      alt="avatar"
                      className="w-10 h-10 rounded-full ml-2"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}

        {/* Ref for last message */}
        <div ref={lastMessageRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 items-center flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white/30 text-white rounded-md hover:bg-white/50 active:scale-[0.99]"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default MessageContainer;
