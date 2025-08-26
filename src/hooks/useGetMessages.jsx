// hooks/useGetMessages.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/messageSlice";

export default function useGetMessages() {
  const dispatch = useDispatch();
  const selectedUser = useSelector((s) => s.user.selectedUser);

  useEffect(() => {
    // no selected user yet → clear messages and bail
    if (!selectedUser?._id) {
      dispatch(setMessages([]));
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/message/getMessages/${selectedUser._id}`,
          { withCredentials: true }
        );
        if (!cancelled) {
          const msgs = data?.convo?.messages ?? [];
          dispatch(setMessages(Array.isArray(msgs) ? msgs : []));
        }
      } catch (err) {
        if (!cancelled) dispatch(setMessages([]));
        console.error("getMessages failed:", err);
      }
    })();

    return () => { cancelled = true; };
  }, [dispatch, selectedUser?._id]);
}
