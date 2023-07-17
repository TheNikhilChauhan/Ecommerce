import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductOverview from "./features/product/ProductOverview";
import Protected from "./features/auth/authComponent/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoggedIn } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrder from "./features/user/userOrder";
import UserProfile from "./features/user/userProfile";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { Logout } from "./features/auth/authComponent/Logout";
import ForgotPasswordPAge from "./pages/ForgotPasswordPAge";
import AdminPage from "./pages/AdminPage";
import ProtectedAdmin from "./features/auth/authComponent/ProtectedAdmin";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                {" "}
                <Home />{" "}
              </Protected>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                {" "}
                <AdminPage />{" "}
              </ProtectedAdmin>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/cart"
            element={
              <Protected>
                {" "}
                <CartPage />{" "}
              </Protected>
            }
          />

          <Route
            path="/checkout"
            element={
              <Protected>
                {" "}
                <CheckoutPage />{" "}
              </Protected>
            }
          />
          <Route
            path="/productoverview/:id"
            element={
              <Protected>
                {" "}
                <ProductOverview />{" "}
              </Protected>
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/user-orders" element={<UserOrder />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPasswordPAge />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
