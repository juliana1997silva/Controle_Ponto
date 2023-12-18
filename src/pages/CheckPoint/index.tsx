import React from 'react';
import AppProvider from './hooks';
import ListPoint from './ListPoint';

const PageCheckPoint: React.FC = () => {
  return (
    <>
      <AppProvider>
        <ListPoint />
      </AppProvider>
    </>
  );
};

export default PageCheckPoint;
