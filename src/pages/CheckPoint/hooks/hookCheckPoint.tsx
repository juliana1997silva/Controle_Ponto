import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface consultsData {
  request_key?: string;
  description?: string;
  id?: string | undefined | null;
  link?: string;
  registry_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface expensesData {
  id?: string;
  registry_id?: string;
  created_at?: string;
  updated_at?: string;
  km?: string;
  coffe?: string;
  lunch?: string;
  dinner?: string;
  parking?: string;
  toll?: string;
  others?: string;
  total?: string;
}

export interface nonBusinessData {
  id?: string | undefined | null;
  registry_id?: string;
  entry_time?: string;
  lunch_entry_time?: string | null;
  lunch_out_time?: string | null;
  out_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface timeData {
  id?: string;
  date?: string;
  user_id?: string;
  entry_time?: string;
  location?: string;
  lunch_entry_time?: string;
  lunch_out_time?: string;
  out_time?: string;
  created_at?: string;
  updated_at?: string;
  nonbusiness?: nonBusinessData[] | null;
  consults?: consultsData[] | null;
  status?: string;
}

interface HooksCheckPointData {
  openModal: boolean;
  setOpenModal(openModal: boolean): void;
  dataModal: timeData;
  setDataModal(dataModal: timeData): void;
  commercialData: nonBusinessData;
  setCommercialData(commercialData: nonBusinessData): void;
  commercial: nonBusinessData[];
  setCommercial(commercial: nonBusinessData[]): void;
  openCommercial: boolean;
  setOpenCommercial(openCommercial: boolean): void;
  registerPoint(dataTime: timeData): void;
  listPoint(): void;
  dataRegister: timeData[];
  setDataRegister(dataRegister: timeData[]): void;
  dataRegisterStore: timeData;
  setDataRegisterStore(dataRegister: timeData): void;
  mode: 'created' | 'edit';
  setMode(mode: 'created' | 'edit'): void;
  updatePoint(dataTime: timeData): void;
  list: boolean;
  setList(list: boolean): void;
  showBack: boolean;
  setShowBack(showBack: boolean): void;
  deleteConsult(id: string): void;
}

const CheckPointContext = createContext<HooksCheckPointData>({} as HooksCheckPointData);

const CheckPointContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<timeData>({} as timeData);
  const [commercialData, setCommercialData] = useState<nonBusinessData>({} as nonBusinessData);
  const [commercial, setCommercial] = useState<nonBusinessData[]>([]);
  const [openCommercial, setOpenCommercial] = useState(false);
  const [dataRegister, setDataRegister] = useState<timeData[]>([] as timeData[]);
  const [dataRegisterStore, setDataRegisterStore] = useState<timeData>({} as timeData);
  const [mode, setMode] = useState<'created' | 'edit'>('created');
  const [list, setList] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const listPoint = useCallback(async () => {
    setLoading(true);
    const response = await api
      .get(`/checkpoint`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        //console.log(error.response)
      });

    if (response) {
      //console.log(response.data);
      setDataRegister(response.data);
    }
    setList(true);
    setLoading(false);
  }, [setDataRegister, user, setList, setLoading]);

  const registerPoint = useCallback(
    async (dataTime: timeData) => {
      const registerData = await api
        .post(`/checkpoint`, dataTime, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .catch(function (error) {
          //console.log(error);
        });

      if (registerData) {
        //console.log('registerData.data::', registerData.data);
        toast.success('Ponto registrado com sucesso !');
        listPoint();
      }
    },
    [user, listPoint]
  );

  const updatePoint = useCallback(
    async (dataTime: timeData) => {
      await api
        .put(`/checkpoint/${dataTime.id}`, dataTime, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          //console.log(response.data);
          toast.success('Atualização realizada com sucesso !');
          listPoint();
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    [listPoint, user]
  );

  const deleteConsult = useCallback(
    async (id: string) => {
      const data = await api
        .delete(`/consult/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .catch((error) => {
          //console.log(error)
        });

      if (data) {
        toast.success('Consulta deletada com sucesso');
      }
    },
    [user]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <CheckPointContext.Provider
      value={{
        openModal,
        setOpenModal,
        dataModal,
        setDataModal,
        commercialData,
        setCommercialData,
        commercial,
        setCommercial,
        openCommercial,
        setOpenCommercial,
        registerPoint,
        listPoint,
        dataRegister,
        setDataRegister,
        dataRegisterStore,
        setDataRegisterStore,
        mode,
        setMode,
        updatePoint,
        list,
        setList,
        showBack,
        setShowBack,
        deleteConsult
      }}
    >
      {children}
    </CheckPointContext.Provider>
  );
};

function useCheckPoint(): HooksCheckPointData {
  const context = useContext(CheckPointContext);

  if (!context) {
    throw new Error('useCheckPoint must be used within a useAuth');
  }
  return context;
}

export { CheckPointContextProvider, useCheckPoint };
