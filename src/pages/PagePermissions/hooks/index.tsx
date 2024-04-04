import React from 'react';
import { PermissionsContextProvider } from './hooksPermission';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <PermissionsContextProvider>{children}</PermissionsContextProvider>;
};
export default AppProvider;
