import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';
import Loading from '../../../components/Loading';

export interface HomeData {
  id?: string;
  name?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface HooksHomeData {
  
}

const HomeContext = createContext<HooksHomeData>({} as HooksHomeData);

const HomeContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  //lista
  const listHome = useCallback(async () => {
    setLoading(true);
   const data =  await api
      .get('/dashboard', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
    setLoading(false);
  }, [user, setLoading]);


  if (loading) {
    return <Loading />;
  }

  return (
    <HomeContext.Provider
      value={{
        listHome
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

function useHome(): HooksHomeData {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within a useHome');
  }
  return context;
}

export { HomeContextProvider, useHome };
