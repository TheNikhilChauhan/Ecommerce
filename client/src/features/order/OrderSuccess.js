import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoggedIn } from "../../features/auth/authSlice";
import { resetCartAsync, selectItems } from "../../features/cart/cartSlice";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { Navigate, useParams } from "react-router-dom";

import { resetOrder } from "../../features/order/orderSlice";
import {
  fetchUserOrdersAsync,
  selectUserOrders,
} from "../../features/user/userSlice";
import { discountPrice } from "../../app/constant";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const user = useSelector(selectUserLoggedIn);
  const params = useParams();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(resetCartAsync(user.id)); //reset cart
    dispatch(resetOrder()); //reset current order
  }, [dispatch, user]);

  useEffect(() => {
    console.log(user.id);
    dispatch(fetchUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      {console.log("this is order", orders)}
      {orders.map((order) => (
        <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg text-left">
          <h2 className="text-lg text-left font-semibold text-blue-600 mb-3">
            Thank you!
          </h2>
          <p className="mb-2 text-4xl font-bold">It's on the way!</p>
          <p className="mb-12 text-md text-gray-500">
            Your order #{params?.id} has shipped and will be with you soon.
          </p>
          {/* <h3 className="text-sm font-semibold mb-4">Tracking number</h3>
          <p className="mb-6 text-blue-700 font-medium">
            {Math.floor(Math.random() * 100000000000)}
          </p> */}

          <div className="border-t border-gray-300 pt-6 pb-4 flex flex-col">
            {order.items.map((item) => (
              <>
                <li key={item.product.id} className="flex py-6">
                  <div className=" flex h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="mb-6 font-semibold">
                      {item.product.title}
                    </div>
                    <div className="mb-6">{item.product.title}</div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                        <p>{item.product.quantity}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Price</h3>
                        <p>
                          <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                          {item.product.discountPrice}
                        </p>
                      </div>
                    </div>
                    <hr className="border-t border-gray-300 mt-6 pb-4 flex flex-col" />
                  </div>
                </li>
                <h3 className="text-lg font-semibold mt-6 mb-4">Summary</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <h4 className="text-md font-semibold mb-2">Subtotal</h4>
                    <p>
                      <CurrencyRupeeIcon className="w-9 h-15 inline"></CurrencyRupeeIcon>
                      {item.product.discountPrice * item.quantity}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold mb-2">Shipping</h4>
                  <p>Free</p>
                </div>
              </>
            ))}
            <h3 className="text-lg font-semibold mt-6 mb-4">
              Your information
            </h3>

            {/* Address */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {/* <div>
              {order.selectedAddress.name.map((address) => {
                return (
                  <div>
                    <div className="text-lg font-semibold mb-2">
                      Shipping address
                    </div>
                    <h4 className="text-md font-md mb-2"></h4>
                    <p>{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.pinCode}</p>
                    <h4 className="text-md font-semibold mt-4 mb-2">
                      Billing address
                    </h4>
                    <p>{address.name}</p>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.pinCode}</p>
                  </div>
                );
              })}
            </div> */}

              <div>
                <h4 className="text-lg font-semibold mb-2">Payment method</h4>
                <p>Apple Pay</p>
                <p>Mastercard</p>
                <p>••••Ending in1545</p>
                <h4 className="text-md font-semibold mt-4 mb-2">
                  Shipping method
                </h4>
                <p>DHL</p>
                <p>Takes up to 3 working days</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSuccess;
