import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/hooksAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user.logged) {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
