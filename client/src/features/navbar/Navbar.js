import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PW } from "../../assets/PW.jpg";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectItems } from "../cart/cartSlice";

const Navbar = ({ children }) => {
  const items = useSelector(selectItems);

  return (
    <div>
      <div className=" bg-stone-800 shadow-xl cursor-pointer pt-2">
        <img
          className=" w-20 h-12 float-left pl-3  rounded-md "
          src={"/src/assets/PW.jpg"}
          alt="logo"
        />

        <ul className=" flex justify-end gap-7 h-12 items-center pr-5 text-white text-lg ">
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/"}>Home</NavLink>
          </li>

          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/register"}>Register</NavLink>
          </li>

          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/login"}>Login</NavLink>
          </li>

          <li>
            <div className="relative inline-block text-left  bg-slate-600">
              <div>
                <button
                  /* onClick={handleClick} */
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {/* {auth.user.name} */}
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              ></div>
            </div>
          </li>
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/cart"}>
              <button
                type="button"
                className="ml-auto flex-shrink-0  bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                🛒 Cart
              </button>
            </NavLink>
            {items && items.length > 0 && (
              <span className="inline-flex items-center rounded-md bg-red-50   px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                {items.length}
              </span>
            )}
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
};

export default Navbar;
