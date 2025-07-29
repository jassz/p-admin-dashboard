import isTokenExpired from "helper/isTokenExpired";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const tokenExp = isTokenExpired(token)

  return tokenExp ? <Navigate to="/signin" /> : <Outlet />;
};

export default PrivateRoutes;
