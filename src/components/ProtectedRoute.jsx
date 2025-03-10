import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("token");
  if (!isAuthenticated) {
    return <Navigate to="/dashboard/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
