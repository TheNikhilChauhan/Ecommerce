import { useSelector } from "react-redux";
import { selectUserLoggedIn } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(selectUserLoggedIn);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
}

export default Protected;
