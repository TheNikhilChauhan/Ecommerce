import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const addresses = [
  {
    name: "John Wick",
    street: "JW street",
    pinCode: 1200,
    phone: 134154,
    city: "New York",
  },
  {
    name: "Louis Litt",
    street: "LL street",
    pinCode: 1002,
    phone: 24543563,
    city: "Boston",
  },
];

const CheckoutPage = () => {
  const countries = ["China", "Russia", "UK"];
  const [menu, setMenu] = useState(false);
  const [country, setCountry] = useState("United States");

  const changeText = (e) => {
    setMenu(false);
    setCountry(e.target.textContent);
  };

  return (
    <div>
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
                Home {">"} Electronics {">"} Headphones {">"} Cart {">"}{" "}
                Checkout
              </p>
            </div>

            <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
              {/* Order Summary */}
              <>
                <div className="p-4  bg-slate-100 mt-7">
                  <h1 className="text-center font-bold text-2xl underline text-gray-700">
                    Order Summary
                  </h1>
                  <div className="mt-8 ml-6 mr-6">
                    <div className="flow-root ">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  Qty:
                                  <select>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </select>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
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

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6 ml-6 mr-6 mt-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>$262.00</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                  </div>
                </div>
              </>
              {/* Second part of checkout */}
              <div className="p-8 bg-gray-100 flex flex-col lg:w-full xl:w-3/5">
                {/* shipping details */}
                <div className="border-b border-gray-900/10 pb-12">
                  <fieldset>
                    <legend className="font-bold mb-4">
                      Personal Information
                    </legend>
                    <div className="flex flex-col gap-2 justify-start text-left text-md font-medium">
                      <div className=" p-2 ">
                        <label for="Fname">First Name:</label>
                        <input type="text" className="mr-3" />
                        <label for="Fname">Last Name:</label>
                        <input type="text" />
                      </div>
                      <label for="email">Email</label>
                      <input className=" text-left w-1/2" type="email" />
                      <lable for="selectCountry">Country</lable>
                      <select id="selectCountry" className="w-1/3">
                        <option value={""}>---Select--- </option>
                        <option value={"India"}>India </option>
                        <option value={"Russia"}>Russia </option>
                        <option value={"USA"}>USA </option>
                        <option value={"China"}>China </option>
                      </select>
                      City:
                      <input type="text" className="w-1/4" />
                      Street: <textarea type="textarea" className="w-2/4 " />
                      Pincode:
                      <input type="text" className="w-1/4" />
                    </div>
                    <hr className="border w-full mt-10 mb-10  text-gray-900" />
                    <h1 className="font-bold text-left text-lg">Addresses</h1>
                    <p className="text-slate-500 text-left mb-4">
                      Choose from Existing addresses
                    </p>
                    <ul>
                      {addresses.map((address) => {
                        return (
                          <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                            <div className="flex gap-x-4">
                              <input
                                type="radio"
                                name="address"
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
                  </fieldset>
                </div>

                {/* payment */}
                <div className="flex flex-row justify-center items-center mt-6">
                  <hr className="border w-full" />
                  <p className="flex flex-shrink-0   px-4 text-base leading-0 text-gray-600">
                    or pay with card
                  </p>
                  <hr className="border w-full" />
                </div>

                <div className="mt-8">
                  <input
                    className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="email"
                    placeholder="Email"
                  />
                </div>

                <label className="mt-8 text-base leading-4 text-gray-800">
                  Card details
                </label>
                <div className="mt-2 flex-col">
                  <div>
                    <input
                      className="border rounded-tl rounded-tr border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                      type="email"
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

                <label className="mt-8 text-base leading-4 text-gray-800">
                  Country or region
                </label>
                <div className="mt-2 flex-col">
                  <div className="relative">
                    <button
                      className="text-left border rounded-tr rounded-tl border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 bg-white"
                      type="email"
                    >
                      {country}
                    </button>
                    <svg
                      onClick={() => setMenu(!menu)}
                      className={
                        "transform  cursor-pointer absolute top-4 right-4 " +
                        (menu ? "rotate-180" : "")
                      }
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.5 5.75L8 10.25L12.5 5.75"
                        stroke="#27272A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div
                      className={
                        "mt-1 absolute z-10 w-full flex bg-gray-50 justify-start flex-col text-gray-600 " +
                        (menu ? "block" : "hidden")
                      }
                    >
                      {countries.map((country) => (
                        <div
                          key={country}
                          className="cursor-pointer hover:bg-gray-800 hover:text-white px-4 py-2"
                          onClick={changeText}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  </div>
                  <input
                    className="border rounded-bl rounded-br border-gray-300 p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                    type="text"
                    placeholder="ZIP"
                  />
                </div>

                <button className="mt-8 border border-transparent hover:border-gray-300 bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full">
                  <div>
                    <p className="text-base leading-4">Pay $54652</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
