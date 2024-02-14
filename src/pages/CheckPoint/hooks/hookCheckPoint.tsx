import moment from 'moment';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface timeData {
  id?: string;
  date?: string;
  user_id?: string;
  entry_time?: string;
  location?: string;
  lunch_entry_time?: string;
  lunch_out_time?: string;
  out_time?: string;
  observation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface consultsData {
  queries?: string;
  description?: string;
  id?: string;
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
  id?: string;
  registry_id?: string;
  entry_time?: string;
  lunch_entry_time?: string;
  lunch_out_time?: string;
  out_time?: string;
  observation?: string;
  created_at?: string;
  updated_at?: string;
}

export interface data {
  business: timeData;
  nonbusiness: nonBusinessData[];
  consults: consultsData[];
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
  registerPoint(dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]): void;
  listPoint(): void;
  dataRegister: timeData[];
  setDataRegister(dataRegister: timeData[]): void;
  dataRegisterStore: data;
  setDataRegisterStore(dataRegister: data): void;
  showPoint(id: string): void;
  mode: 'created' | 'edit';
  setMode(mode: 'created' | 'edit'): void;
  updateData: boolean;
  setUpdateData(updateData: boolean): void;
  updatePoint(dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]): void;
}

const CheckPointContext = createContext<HooksCheckPointData>({} as HooksCheckPointData);

const CheckPointContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<timeData>({} as timeData);
  const [commercialData, setCommercialData] = useState<nonBusinessData>({} as nonBusinessData);
  const [commercial, setCommercial] = useState<nonBusinessData[]>([]);
  const [openCommercial, setOpenCommercial] = useState(false);
  const [dataRegister, setDataRegister] = useState<timeData[]>([] as timeData[]);
  const [dataRegisterStore, setDataRegisterStore] = useState<data>({} as data);
  const [mode, setMode] = useState<'created' | 'edit'>('created');
  const [updateData, setUpdateData] = useState(false);

  const listPoint = useCallback(async () => {
    await api
      .get(`/checkpoint`)
      .then((response) => setDataRegister(response.data))
      .catch(function (error) {
        console.log(error);
      });
  }, [setDataRegister]);

  const registerPoint = useCallback(
    async (dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]) => {
      const data = {
        user_id: user.id,
        date: moment(dataTime.date).format('YYYY-MM-DD'),
        location: dataTime.location,
        entry_time: dataTime.entry_time,
        lunch_entry_time: dataTime.lunch_entry_time,
        lunch_out_time: dataTime.lunch_out_time,
        out_time: dataTime.out_time,
        observation: dataTime.observation,
        nonbusiness: nonBusiness,
        consults: consultations
      };

      console.log(data);

      const registerData = await api.post(`/checkpoint`, data).catch(function (error) {
        console.log(error);
      });

      if (registerData) {
        console.log(registerData.data);
        toast.success('Ponto registrado com sucesso !');
      }
    },
    [user]
  );

  const showPoint = useCallback(
    async (id: string) => {
      await api
        .get(`/checkpoint/${id}`)
        .then((response) => {
          console.log(response.data);
          setDataRegisterStore(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [setDataRegisterStore]
  );

  const updatePoint = useCallback(
    async (dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]) => {
      const data = {
        user_id: dataTime.user_id,
        date: dataTime.date,
        location: dataTime.location,
        entry_time: dataTime.entry_time,
        lunch_entry_time: dataTime.lunch_entry_time,
        lunch_out_time: dataTime.lunch_out_time,
        out_time: dataTime.out_time,
        observation: dataTime.observation,
        nonbusiness: nonBusiness,
        consults: consultations
      };

      await api
        .put(`/checkpoint/${dataTime.id}`, data)
        .then((response) => {
          console.log(response.data);
          toast.success('Registro atualizado com sucesso !');
          listPoint();
          setUpdateData(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [listPoint, setUpdateData]
  );

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
        showPoint,
        dataRegisterStore,
        setDataRegisterStore,
        mode,
        setMode,
        updateData,
        setUpdateData,
        updatePoint
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
