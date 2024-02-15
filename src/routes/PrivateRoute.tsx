import React from 'react';
import { useAuth } from '../hooks/hooksAuth';
//import { useAuth } from "../hooks/hooksAuth";
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (user && user.token === undefined) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
