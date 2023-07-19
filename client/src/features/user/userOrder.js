import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserOrders,
  fetchUserOrdersAsync,
  selectUserInfoStatus,
  selectUserInfo,
  fetchLoggedInUserAsync,
} from "./userSlice";
import { selectItems } from "../cart/cartSlice";
import { CurrencyRupeeIcon } from "@heroicons/react/20/solid";
import { discountPrice } from "../../app/constant";

const UserOrder = () => {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  const status = useSelector(selectUserInfoStatus);
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = new Date();

  useEffect(() => {
    console.log(user.id);
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div className="flex border-2 border-gray-300 justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 ">
              <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                <div className="flex flex-col justify-start items-start w-full space-y-9">
                  <div className="flex justify-start flex-col items-start space-y-2">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-left">
                        Order history
                      </h2>

                      <div className=" flex flex-col mb-8">
                        <div className="mb-6 flex flex-col">
                          <p className="text-lg font-md text-gray-500 text-left mb-12">
                            Check the status of recent orders, manage returns
                            and download invoices.
                          </p>
                          <div className="flex flex-wrap mt-4 justify-between">
                            <div className="flex  ">
                              <div className=" w-full sm:w-1/2 md:w-1/3 mr-32">
                                <p className="font-bold">Date placed</p>
                                <p>
                                  {date.getDate()}/{month[date.getMonth()]}/
                                  {date.getFullYear()}
                                </p>
                              </div>
                              <div className="w-full sm:w-1/2 md:w-1/3 mr-32">
                                <p className="font-bold">Order number</p>
                                <p>{order.id}</p>
                              </div>

                              <div className="w-full sm:w-1/2 md:w-1/3 mr-32">
                                <p className="font-bold">Total amount</p>
                                <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                                {order.totalAmount}
                              </div>
                            </div>
                            <div>
                              <div className=" border-2 border-solid border-slate-400">
                                <p className="p-3 font-semibold text-gray-600">
                                  View Invoice
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col ">
                          <div className="flex text-left justify-evenly ">
                            <h4 className="text-lg font-bold mb-2">Products</h4>
                            <h4 className="text-lg font-bold mb-2">Price</h4>
                            <h4 className="text-lg font-bold mb-2">Status</h4>
                            <h4 className="text-lg font-bold mb-2">Info</h4>
                          </div>

                          <div className="  border-t-2 mb-4 mt-5">
                            <ul className="  mb-2">
                              {order.items.map((item) => (
                                <div className=" border-b-4 mb-5  ">
                                  <li
                                    key={item.id}
                                    className=" font-semibold flex justify-evenly gap-28 ml-20 align-center"
                                  >
                                    <div className="">
                                      <img
                                        src={item.thumbnail}
                                        className=" h-48 w-48"
                                      />

                                      <div className="mb-2">{item.title}</div>
                                    </div>
                                    <div>
                                      <div className="mt-20">
                                        <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                                        {discountPrice(item)}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="mt-20">
                                        {order.status}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="mt-20">View Product</div>
                                    </div>
                                    <div>
                                      <div className=" border-b-2 border-gray-700 mt-6 pb-4 " />
                                    </div>
                                  </li>
                                </div>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserOrder;
