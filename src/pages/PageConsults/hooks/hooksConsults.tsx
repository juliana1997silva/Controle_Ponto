import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface RequestDataForm {
  user_id?: string;
  request_key?: string;
}

export interface ConsultsData {
  request_key: string;
  user: string;
  situation: string;
  documentation: number;
  revision: number;
  bug: number;
  daily: number;
  update: number;
  service_forecast: number;
  commit: number;
  team_id: string;
}

interface HooksConsultsData {
  consultsData: ConsultsData[];
  setConsultsData(consultsData: ConsultsData[]): void;
  consultsGet(): void;
  list: boolean;
  setList(list: boolean): void;
  consultsPost(requestData: RequestDataForm):void;
}

const ConsultsContext = createContext<HooksConsultsData>({} as HooksConsultsData);

const ConsultsContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [consultsData, setConsultsData] = useState<ConsultsData[]>({} as ConsultsData[]);
  const [list, setList] = useState(false);

  const consultsGet = useCallback(async () => {
    const data = await api.get('/consults').catch((error) => {
      //console.log(error);
    });

    if (data) {
      setConsultsData(data.data);
    }
    setList(true);
  }, [user, setConsultsData, setList]);

  const consultsPost = useCallback(
    async (requestData: RequestDataForm) => {
      const data = await api.post(`consult/${requestData.request_key}/${requestData.user_id}`).catch((error) => {
        console.log(error);
      });
      if (data) {
        consultsGet();
        toast.success("Consulta cadastrada com sucesso")
      }
    },
    [consultsGet]
  );

  return (
    <ConsultsContext.Provider value={{ consultsGet, consultsData, setConsultsData, list, setList, consultsPost }}>
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
