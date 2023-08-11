import React from 'react';
import { UsersContextProvider } from './hooksUsers';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <UsersContextProvider>{children}</UsersContextProvider>;
};
export default AppProvider;
