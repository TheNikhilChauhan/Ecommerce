import React, { useEffect } from "react";
import { logoutAsync, selectUserLoggedIn } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserLoggedIn);

  useEffect(() => {
    dispatch(logoutAsync());
  });
  return <div>{!user && <Navigate to="/login" replace={true}></Navigate>}</div>;
};
