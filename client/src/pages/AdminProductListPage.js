import React from "react";
import AdminPage from "./AdminPage";
import AdminProductList from "../features/Admin/components/AdminProductList";

const AdminProductListPage = () => {
  return (
    <div>
      <AdminPage />
      <AdminProductList></AdminProductList>
    </div>
  );
};

export default AdminProductListPage;
