import React from 'react';
import { IProps } from '../../../types';
import { ConsultsContextProvider } from './hooksConsults';
import { UserGroupsContextProvider } from '../../PageUserGroups/hooks/hooksUserGroups';

const AppProvider: React.FC<IProps> = ({ children }) => (
  <UserGroupsContextProvider>
    <ConsultsContextProvider>{children}</ConsultsContextProvider>
  </UserGroupsContextProvider>
);

export default AppProvider;
