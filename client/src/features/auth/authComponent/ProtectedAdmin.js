import { useSelector } from "react-redux";
import { selectUserLoggedIn } from "../authSlice";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectUserLoggedIn);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  if (user && user.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
}

export default ProtectedAdmin;
