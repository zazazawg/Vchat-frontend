import React from "react";
import { IoIosSearch } from "react-icons/io";
import OtherUsers from "../../components/OtherUsers";

const sidebar = () => {
  return (
    <div>
      <div className="  ">
        <form className="flex gap-0.5" action="">
          <input
            className="border  placeholder:text-gray-100 placeholder:ml-2 placeholder:p-1 p-1 rounded-md border-gray-200"
            placeholder="Search"
            type="text"
            name="Search"
          />
          <button className="p-2 hover:bg-gray-300 transition duration-300 rounded-full">
            <IoIosSearch size={25} />
          </button>
        </form>
        
        
      </div>
      <div className="mt-3"><OtherUsers></OtherUsers></div>
    </div>
  );
};

export default sidebar;
