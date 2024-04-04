import React from 'react';
import { GroupsContextProvider } from './hooksGroups';
import { UserGroupsContextProvider } from '../../PageUserGroups/hooks/hooksUserGroups';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <UserGroupsContextProvider>
      <GroupsContextProvider>{children}</GroupsContextProvider>
    </UserGroupsContextProvider>
  );
};
export default AppProvider;
