import React from "react";
import AdminPage from "./AdminPage";
import AdminOrders from "../features/Admin/components/AdminOrders";

const AdminOrderPage = () => {
  return (
    <div>
      <AdminPage />
      <AdminOrders></AdminOrders>
    </div>
  );
};

export default AdminOrderPage;
