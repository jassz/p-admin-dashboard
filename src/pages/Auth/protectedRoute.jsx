import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isVerified = localStorage.getItem("isVerified") === "true";
  const token = localStorage.getItem("token");

  if (!token || isVerified) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
