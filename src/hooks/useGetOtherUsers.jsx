import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

export default function useGetOtherUsers  ()  {
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("useGetOtherUsers");
    const fetchOtherUsers = async () => {
      try {
        const result = await axios.get(
          "http://localhost:8000/api/user/getOtherUsers",
          { withCredentials: true }
        );
        // console.log(result.data);
        dispatch(setOtherUsers(result.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, [dispatch]);
};

