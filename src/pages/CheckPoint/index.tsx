import React from 'react';
import AppProviderCheckpoint from './hooks';
import ListPoint from './ListPoint';

const PageCheckPoint: React.FC = () => {
  return (
    <>
      <AppProviderCheckpoint>
        <ListPoint />
      </AppProviderCheckpoint>
    </>
  );
};

export default PageCheckPoint;
