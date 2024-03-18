import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface ConsultsData {
  
}

interface HooksConsultsData {
  
}

const ConsultsContext = createContext<HooksConsultsData>({} as HooksConsultsData);

const ConsultsContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <ConsultsContext.Provider
      value={{
      
      }}
    >
      {children}
    </ConsultsContext.Provider>
  );
};

function useConsults(): HooksConsultsData {
  const context = useContext(ConsultsContext);

  if (!context) {
    throw new Error('useConsults must be used within a useAuth');
  }
  return context;
}

export { ConsultsContextProvider, useConsults };
