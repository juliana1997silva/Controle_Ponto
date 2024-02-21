import React from 'react';
//import { useAuth } from '../../hooks/hooksAuth';
import Dashboard from './Dashboard';
import { useAuth } from '../../hooks/hooksAuth';

const Home: React.FC = () => {  

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
