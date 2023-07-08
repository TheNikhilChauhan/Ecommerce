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

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
