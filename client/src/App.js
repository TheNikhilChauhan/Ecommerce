import React from "react";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductOverview from "./features/product/ProductOverview";

/* const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    path: "/cart",
    element: <Cart></Cart>,
  },
]);
 */
function App() {
  return (
    <div className="App">
      {/* <RouterProvider router={router}></RouterProvider> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/productoverview" element={<ProductOverview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
