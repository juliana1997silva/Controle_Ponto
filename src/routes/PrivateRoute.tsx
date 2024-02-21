import React, { useEffect } from 'react';
import { UserData, useAuth } from '../hooks/hooksAuth';
//import { useAuth } from "../hooks/hooksAuth";
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { decode } from 'js-base64';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user} = useAuth();

  

  console.log('Private Token::', user.token);

  if (user) {
    if (!user.token) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
