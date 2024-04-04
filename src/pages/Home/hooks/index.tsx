import React from 'react';
import { HomeContextProvider } from './hooksHome';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <HomeContextProvider>{children}</HomeContextProvider>;
};
export default AppProvider;
