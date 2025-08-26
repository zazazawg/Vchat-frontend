// MessageContainer.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import useGetMessages from "../../hooks/useGetMessages";

const formatTime = (iso) => {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Safely extract an id from many possible shapes
const normalizeId = (val) => {
  if (!val) return undefined;
  if (typeof val === "string" || typeof val === "number")
    return String(val).trim();
  // object case: message.senderId could be an object { _id, id }
  return String(val._id ?? val.id ?? "").trim();
};

const MessageContainer = () => {
  useGetMessages();

  const messages = useSelector((s) => s.message?.messages) ?? [];
  const authUser = useSelector((s) => s.user?.authUser);
  const selectedUser = useSelector((s) => s.user.selectedUser);
  console.log("selectedUser", selectedUser);

  const currentUserId = useMemo(() => {
    return normalizeId(
      authUser?.userId ??
        authUser?.id ??
        authUser?.user?._id ??
        authUser?.user?.id
    );
  }, [authUser]);
  console.log("authUser", authUser);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="py-4 px-4 border-b flex items-center justify-between flex-shrink-0">
        {selectedUser && (
          <div className="flex items-center">
            <img
              src={selectedUser.profilePhoto}
              alt="avatar"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <p className="font-semibold">{selectedUser.fullname}</p>
              <p className="font-semibold text-gray-400 text-sm">
                {selectedUser.username}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg) => {
            // msg: { _id, message, senderId, receiverId, createdAt, ... }
            const senderIdNorm = normalizeId(msg.senderId);
            const mine =
              currentUserId && senderIdNorm
                ? senderIdNorm === currentUserId
                : false;

            // Debug once if needed
            // console.log({ senderIdNorm, currentUserId, mine, msg });

            return (
              <div
                key={normalizeId(msg) || msg._id || msg.id}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    mine
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {msg.message}
                  </p>
                  <span
                    className={`mt-1 block text-[10px] opacity-80 ${
                      mine ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {formatTime(msg.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-2 items-center flex-shrink-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={send}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:scale-[0.99]"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default MessageContainer;
