import React from 'react';
import { GroupsContextProvider } from './hooksGroups';

interface IProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return <GroupsContextProvider>{children}</GroupsContextProvider>;
};
export default AppProvider;
