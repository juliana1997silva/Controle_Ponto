import React from 'react';
import Point from './Point';
import AppProvider from './hooks';

const PageCheckPoint: React.FC = () => {
  return (
    <>
      <AppProvider>
        <Point />
      </AppProvider>
    </>
  );
};

export default PageCheckPoint;
