import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface DashboardData {
  consultations: [string[]];
  cheats: any[];
}

interface HooksHomeData {
  dataDashboard: DashboardData;
  setDataDashboard(dataDashboard: DashboardData): void;
  consultationsData: any[];
  setConsultationsData(consultationsData: any[]): void;
  list: boolean;
  setList(list: boolean): void;
  listDashboard(): void;
}

const HomeContext = createContext<HooksHomeData>({} as HooksHomeData);

const HomeContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState<DashboardData>({} as DashboardData);
  const [consultationsData, setConsultationsData] = useState<any[]>([]);
  const [list, setList] = useState(false);

  const listDashboard = useCallback(async () => {
    setLoading(true);
    console.log('CHAMANDO O HOOKS PARA CONSULTA');
    const dataHome = await api
      .get(
        '/dashboard' /* {
        headers: {
          // Authorization: `Bearer ${user.token}`
        }
      } */
      )
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
    if (dataHome) {
      console.log('PASSEI POR AQUI...');
      console.log('datahooks', dataHome.data);
      setDataDashboard(dataHome.data);

      const formattedData = [
        ['', '', { role: 'style' }, { sourceColumn: 0, role: 'annotation', type: 'string', calc: 'stringify' }],
        ...dataHome.data.consultations.map(([category, value, color]: any) => [category, value, color, null])
      ];

      setConsultationsData(formattedData);
    }
    setList(true);
    setLoading(false);
  }, [setLoading, setDataDashboard, setList, setConsultationsData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <HomeContext.Provider
      value={{ dataDashboard, setDataDashboard, consultationsData, setConsultationsData, list, setList, listDashboard }}
    >
      {children}
    </HomeContext.Provider>
  );
};

function useHome(): HooksHomeData {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('useHome must be used within a useAuth');
  }
  return context;
}

export { HomeContextProvider, useHome };
