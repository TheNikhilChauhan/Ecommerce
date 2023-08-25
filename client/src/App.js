import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

import Protected from "./features/auth/authComponent/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoggedIn } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";

import {
  fetchLoggedInUserAsync,
  selectUserInfo,
} from "./features/user/userSlice";
import { Logout } from "./features/auth/authComponent/Logout";
import ForgotPasswordPAge from "./pages/ForgotPasswordPAge";
import AdminProductList from "./features/Admin/components/AdminProductList";
import Admin from "./features/Admin/components/Admin";

import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProductOverviewPage from "./pages/ProductOverviewPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AdminPage from "./pages/AdminPage";
import ProtectedAdmin from "./features/auth/authComponent/ProtectedAdmin";
import AdminProductListPage from "./pages/AdminProductListPage";
import AdminProductForm from "./pages/AdminProductForm";
import AdminUserProductPage from "./pages/AdminUserProductPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Home></Home>
        </Protected>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <AdminPage></AdminPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-list",
      element: (
        <ProtectedAdmin>
          <AdminProductListPage></AdminProductListPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-form",
      element: (
        <ProtectedAdmin>
          <AdminProductForm></AdminProductForm>
        </ProtectedAdmin>
      ),
    },
    /* {
      path: "/admin/user-products",
      element: (
        <ProtectedAdmin>
          <AdminUserProductPage></AdminUserProductPage>
        </ProtectedAdmin>
      ),
    }, */
    {
      path: "/admin/orders",
      element: (
        <ProtectedAdmin>
          <AdminOrderPage></AdminOrderPage>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-form/edit/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductForm></AdminProductForm>
        </ProtectedAdmin>
      ),
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "*",
      element: <PageNotFound></PageNotFound>,
    },
    {
      path: "/cart",
      element: (
        <Protected>
          {" "}
          <CartPage />{" "}
        </Protected>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Protected>
          {" "}
          <CheckoutPage />{" "}
        </Protected>
      ),
    },
    {
      path: "/productoverview/:id",
      element: (
        <Protected>
          {" "}
          <ProductOverviewPage />{" "}
        </Protected>
      ),
    },
    {
      path: "/order-success/:_id",
      element: (
        <Protected>
          <OrderSuccessPage />
        </Protected>
      ),
    },
    {
      path: "/user-orders",
      element: (
        <Protected>
          <UserOrdersPage />
        </Protected>
      ),
    },
    {
      path: "/user-profile",
      element: (
        <Protected>
          <UserProfilePage />
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPAge />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
