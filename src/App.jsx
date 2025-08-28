import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { RouterProvider, createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { setOnlineUsers } from "./redux/userSlice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default function App() {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    if (authUser && !socketRef.current) {
      // create socket only once
      socketRef.current = io("http://localhost:8000", {
        withCredentials: true,
        transports: ["websocket"],
        query: { userId: authUser.userId },
      });

      const socket = socketRef.current;

      socket.on("connect", () => {
        console.log("✅ Connected with id:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Connection failed:", err.message);
      });

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [authUser, dispatch]);

  return <RouterProvider router={router} />;
}
