import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartItemsAsync,
  selectItems,
  updateCartAsync,
} from "../../features/cart/cartSlice";

import { Link, Navigate } from "react-router-dom";
import { CurrencyRupeeIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { selectUserLoggedIn } from "../../features/auth/authSlice";
import { updateUserAsync } from "../../features/user/userSlice";
import { toast } from "react-hot-toast";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectTotalOrders,
} from "../../features/order/orderSlice";
import { selectUserInfo } from "../../features/user/userSlice";
import Navbar from "../../features/navbar/Navbar";

const Checkout = () => {
  const [menu, setMenu] = useState(false);

  const changeText = (e) => {
    setMenu(false);
  };

  const currentOrder = useSelector(selectCurrentOrder);
  const totalOrder = useSelector(selectTotalOrders);

  const user = useSelector(selectUserInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //cart
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const totalAmount = items.reduce(
    (amount, item) => item.product.discountPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPayment] = useState(null);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteCartItemsAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    console.log(e.target.value);
    setPayment(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && paymentMethod) {
      const order = {
        items,
        totalItems,
        paymentMethod,
        totalAmount,
        user: user.id,
        selectedAddress,
        status: "pending,",
      };
      dispatch(createOrderAsync(order));
    } else {
      toast.error("Enter Address and Payment method");
    }
  };

  return (
    <div>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder &&
        console.log(`currentOrder: ${currentOrder.id}`) &&
        console.log(`totalOrder: ${totalOrder}`) &&
        currentOrder.paymentMethod === "cash" && (
          <Navigate
            to={`/order-success/${currentOrder.id}`}
            replace={true}
          ></Navigate>
        )}
      <div className="flex justify-center items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
          <div className="flex flex-col justify-start items-start w-full space-y-9">
            <div className="flex justify-start flex-col items-start space-y-2">
              <button className="flex flex-row items-center text-gray-600 hover:text-gray-500 space-x-1">
                <svg
                  className="fill-stroke"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.91681 7H11.0835"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.91681 7L5.25014 9.33333"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.91681 7.00002L5.25014 4.66669"
                    stroke="currentColor"
                    strokeWidth="0.666667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm leading-none">Back</p>
              </button>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                Checkout
              </p>
              <p className="text-base leading-normal sm:leading-4 text-gray-600">
                Home {">"}
                Checkout
              </p>
            </div>

            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              {/* Order Summary */}
              <>
                <div className="p-4  bg-slate-100 mt-7 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                  <h1 className="text-center font-bold text-2xl underline text-gray-700">
                    Cart
                  </h1>
                  <div className="mt-8 ml-6 mr-6">
                    <div className="flow-root ">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-300 mb-2"
                      >
                        {items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.href}>
                                      {item.product.title}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                                    {item.product.discountPrice}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between p-3 text-sm">
                                <div className="text-gray-500">
                                  Qty:
                                  <select
                                    onChange={(e) => handleQuantity(e, item)}
                                    value={item.quantity}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>

                                <div className="flex p-3 justify-end ">
                                  <button
                                    type="button"
                                    onClick={(e) => handleRemove(e, item.id)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 px-4 py-6 sm:px-6 ml-6 mr-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                        {totalAmount}
                      </p>
                    </div>
                    <div className="mt-0.5 text-sm text-gray-500">
                      <p>Total Items in Cart</p>
                      <p>{totalItems} Items</p>
                    </div>
                    {/* <div className="mt-6">
                      <Link
                        to={"/checkout"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div> */}
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <Link to={"/"}>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </>

              {/* Second part of checkout */}
              <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                {/* shipping details */}
                <div className="border-b border-gray-900/10 pb-12">
                  <form
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      dispatch(
                        updateUserAsync({
                          ...user,
                          addresses: [...user.addresses, data],
                        })
                      );
                    })}
                  >
                    <legend className="font-bold mb-4">
                      Personal Information
                    </legend>
                    <div className="flex flex-col gap-2 justify-start text-left text-md font-medium sm:flex-col">
                      <label for="Fname"> Name: </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is required",
                        })}
                        autoComplete="given-name"
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm mb-2 w-2/3"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                      <label for="email">Email</label>
                      <input
                        {...register("email", {
                          required: "email is required",
                        })}
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-2/3"
                        type="email"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                      <lable for="selectCountry">Country</lable>
                      <select
                        id="selectCountry"
                        {...register("country", {
                          required: "country is required",
                        })}
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-2/3"
                      >
                        <option value={""}>---Select--- </option>
                        <option value={"India"}>India </option>
                        <option value={"Russia"}>Russia </option>
                        <option value={"USA"}>USA </option>
                        <option value={"China"}>China </option>
                      </select>
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                      City:
                      <input
                        type="text"
                        {...register("city", {
                          required: "city is required",
                        })}
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-1/3"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                      Street:{" "}
                      <textarea
                        {...register("street", {
                          required: "Street is required",
                        })}
                        type="textarea"
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-2/3"
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        {...register("phone", {
                          required: "phone is required",
                        })}
                        type="tel"
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-2/3"
                      />
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                      Pincode:
                      <input
                        {...register("pinCode", {
                          required: "Pincode is required",
                        })}
                        type="text"
                        className="mr-3 rounded-md border-0 text-gray-800 shadow-sm w-1/3"
                      />
                      {errors.pinCode && (
                        <p className="text-red-500">{errors.pinCode.message}</p>
                      )}
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          // onClick={e=>reset()}
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr className="border w-full mt-10 mb-10  text-gray-900" />
                  <h1 className="font-bold text-left text-lg">Addresses</h1>
                  <p className="text-slate-500 text-left mb-4">
                    Choose from Existing addresses
                  </p>
                  <ul>
                    {user.addresses.map((address, index) => {
                      return (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                        >
                          <div className="flex gap-x-4">
                            <input
                              type="radio"
                              name="address"
                              onChange={handleAddress}
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />

                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Street: {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                Pin Code: {address.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden sm:flex sm:flex-col sm:items-end justify-end ml-6">
                            <p className="text-sm leading-6 text-gray-600">
                              Phone: {address.phone}
                            </p>
                            <p className="text-sm leading-6 text-gray-600">
                              City: {address.city}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* payment */}
                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0   px-4 text-base leading-0 text-gray-600">
                    Select Payment Method
                  </p>
                  <hr className="border w-full" />
                </div>

                {/* //cash payment */}
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="cash"
                      name="payments"
                      onChange={handlePayment}
                      value="cash"
                      type="radio"
                      checked={paymentMethod === "cash"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="cash"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Cash
                    </label>
                  </div>
                  {/* //Card Payment */}
                  <div className="flex gap-2">
                    <input
                      id="card"
                      name="payments"
                      onChange={handlePayment}
                      value="card"
                      type="radio"
                      checked={paymentMethod === "card"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 "
                    />
                    <div className="px-5 py-5 border-solid border-2 border-gray-200">
                      <label className="mt-8 text-base leading-4 text-gray-800">
                        Card details
                      </label>
                      <div className="mt-2 flex-col">
                        <div>
                          <input
                            id="card"
                            onChange={handlePayment}
                            className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            placeholder="0000 1234 6549 15151"
                          />
                        </div>
                        <div className="flex-row flex">
                          <input
                            className="border rounded-bl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            type="email"
                            placeholder="MM/YY"
                          />
                          <input
                            className="border rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            type="email"
                            placeholder="CVC"
                          />
                        </div>
                      </div>

                      <label className="mt-8 text-base leading-4 text-gray-800">
                        Name on card
                      </label>

                      <div className="mt-2 flex-col">
                        <div>
                          <input
                            className="border rounded border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                            type="email"
                            placeholder="Name on card"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
                    onClick={handleOrder}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
