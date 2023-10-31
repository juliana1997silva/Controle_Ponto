import React from 'react';
import CoordinatorList from './CoordinatorList';
import AppProvider from './hooks';

const PageCoordinator: React.FC = () => {
  return (
    <AppProvider>
      <CoordinatorList />
    </AppProvider>
  );
};

export default PageCoordinator;
