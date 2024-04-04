import React from 'react';
import PermissionsList from './PermissionsList';
import AppProvider from './hooks';

const PagePermissions: React.FC = () => {
  return (
    <AppProvider>
      <PermissionsList />
    </AppProvider>
  );
};

export default PagePermissions;
