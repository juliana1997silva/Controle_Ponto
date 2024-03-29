import React from 'react';
import { useAuth } from '../hooks/hooksAuth';
//import { useAuth } from "../hooks/hooksAuth";
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    if (!user.token) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
