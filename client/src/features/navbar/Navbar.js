import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import toast from "react-hot-toast";

const Navbar = () => {
  /* const [showOptions, setShowOptions] = useState(false); */

  /* const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully..!");
    navigate("/login");
  };

  const handleClick = () => {
    setShowOptions(!showOptions);
  }; */
  return (
    <div>
      <div className=" bg-stone-800 shadow-xl cursor-pointer pt-2">
        <img
          className=" w-20 h-12 float-left pl-3  rounded-md "
          src="https://images.pexels.com/photos/2235130/pexels-photo-2235130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="logo"
        />

        <ul className=" flex justify-end gap-7 h-12 items-center pr-5 text-white text-lg ">
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            Category
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
              >
                {/* <div class="py-1" role="none">
                  <li className=" text-black  hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
                    <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                    Dashboard
                     </NavLink>
                  </li>

                  <li
                    onClick={handleLogout}
                    className=" text-black hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-black"
                  >
                    Logout
                  </li>
                </div> */}
              </div>
            </div>
          </li>
          <li className="hover: p-2 hover: border-gray-400 hover: border-solid hover:border-2 active:text-yellow-200">
            <NavLink to={"/cart"}>🛒 Cart (0)</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
