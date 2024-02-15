import React from 'react';
//import { useAuth } from '../../hooks/hooksAuth';
import Dashboard from './Dashboard';
import { useAuth } from '../../hooks/hooksAuth';

const Home: React.FC = () => {
   const { user } = useAuth();

   console.log(user);
  

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
