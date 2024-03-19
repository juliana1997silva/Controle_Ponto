import React from 'react';
import { UserGroupsContextProvider } from './hooksUserGroups';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <UserGroupsContextProvider>{children}</UserGroupsContextProvider>;
};
export default AppProvider;
