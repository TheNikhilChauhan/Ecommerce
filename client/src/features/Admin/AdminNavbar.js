import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectUserInfo } from "../user/userSlice";

export default function AdminNavbar({ children }) {
  const user = useSelector(selectUserInfo);

  return (
    <div>
      <div className=" bg-stone-800 shadow-xl cursor-pointer pt-2 ">
        <img
          className=" w-14 h-12 float-left pl-3  rounded-md "
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrhWQ-NbPs4HP7zPlR2cqCC5Czw_QhKrWWGzPpKA2AgjbC8hwxzVmw8Jr3M3MvPMbgQU"
          alt="logo"
        />

        <ul className=" flex justify-end gap-7 h-4 items-center pr-5  text-white text-lg pt-6">
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/admin"}>Admin Dashboard</NavLink>{" "}
          </li>
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/logout"}>Logout</NavLink>{" "}
          </li>
        </ul>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
