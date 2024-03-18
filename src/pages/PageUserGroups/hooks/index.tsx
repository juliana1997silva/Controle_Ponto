import React from 'react';
import { UserGroupsContextProvider } from './hooksUserGroups';
import { UsersContextProvider } from '../../PageUsers/hooks/hooksUsers';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <UserGroupsContextProvider>{children}</UserGroupsContextProvider>;
};
export default AppProvider;
