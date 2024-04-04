import React from 'react';
import { GroupsContextProvider } from './hooksGroups';
import { UserGroupsContextProvider } from '../../PageUserGroups/hooks/hooksUserGroups';
import { PermissionsContextProvider } from '../../PagePermissions/hooks/hooksPermission';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <PermissionsContextProvider>
      <UserGroupsContextProvider>
        <GroupsContextProvider>{children}</GroupsContextProvider>
      </UserGroupsContextProvider>
    </PermissionsContextProvider>
  );
};
export default AppProvider;
