import React, { useState } from "react";

import { NavLink } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <div
        className="w-auto flex-grow flex flex-col   mt-2  bg-white pl-5 pr-5"
        id="nav-content"
      >
        <h4 className=" text-2xl font-bold ml-6 mt-5">Admin Panel</h4>
        <div className="flex mt-2 mb-6">
          <ul className="list-reset flex items-center px-4 ">
            <li className="mr-6 my-2 md:my-0 focus:text-orange-600">
              <NavLink
                to="/admin/product-list"
                className="block py-1 md:py-3 pl-1 align-middle no-underline text-gray-500 border-b-2 hover:text-gray-900 border-white hover:border-orange-600 selection:text-orange-600 s"
              >
                <i className="fas fa-home fa-fw mr-3 "></i>
                <span className="pb-1 md:pb-0 text-md font-medium  ">
                  Product List
                </span>
              </NavLink>
            </li>

            <li className="mr-6 my-2 md:my-0 focus:text-orange-600">
              <NavLink
                to="/admin/product-form"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500  "
              >
                <i className="fas fa-tasks fa-fw mr-3"></i>
                <span className="pb-1 md:pb-0 text-md font-medium ">
                  Add New Product
                </span>
              </NavLink>
            </li>

            <li className="mr-6 my-2 md:my-0">
              <NavLink
                to="/admin/orders"
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500"
              >
                <i className="fa fa-envelope fa-fw mr-3"></i>
                <span className="pb-1 md:pb-0 text-md font-medium">Orders</span>
              </NavLink>
            </li>

            <li className="mr-6 my-2 md:my-0">
              <NavLink
                to=""
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500"
              >
                <i className="fas fa-chart-area fa-fw mr-3"></i>
                <span className="pb-1 md:pb-0 text-sm">Analytics</span>
              </NavLink>
            </li>

            <li className="mr-6 my-2 md:my-0">
              <NavLink
                to=""
                className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500"
              >
                <i className="fa fa-wallet fa-fw mr-3"></i>
                <span className="pb-1 md:pb-0 text-sm">Payments</span>
              </NavLink>
            </li>
          </ul>

          {/* <div className="flex pull-right pl-4 pr-4 md:pr-0">
            <input
              type="search"
              placeholder="Search"
              className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
            />
            <div className="absolute search-icon top: 0.375rem;left: 1.75rem;">
              <svg
                className="fill-current pointer-events-none text-gray-800 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
