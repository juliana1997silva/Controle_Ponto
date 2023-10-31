import React from 'react';
import { CoordinatorContextProvider } from './hooksCoordinator';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <CoordinatorContextProvider>{children}</CoordinatorContextProvider>;
};
export default AppProvider;
