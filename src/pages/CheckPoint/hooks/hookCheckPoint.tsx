import moment from 'moment';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
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
  nonbusiness?: nonBusinessData[];
  consults?: consultsData[];
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
  registerPoint(dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]): void;
  listPoint(): void;
  dataRegister: timeData[];
  setDataRegister(dataRegister: timeData[]): void;
  dataRegisterStore: timeData;
  setDataRegisterStore(dataRegister: timeData): void;
  mode: 'created' | 'edit';
  setMode(mode: 'created' | 'edit'): void;
  updateData: boolean;
  setUpdateData(updateData: boolean): void;
  updatePoint(dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]): void;
  list: boolean;
  setList(list: boolean): void;
  showBack: boolean;
  setShowBack(showBack: boolean): void;
  deleteConsult(id: string): void;
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
  const [dataRegisterStore, setDataRegisterStore] = useState<timeData>({} as timeData);
  const [mode, setMode] = useState<'created' | 'edit'>('created');
  const [updateData, setUpdateData] = useState(false);
  const [list, setList] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const listPoint = useCallback(async () => {
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
      setList(true);
    }
  }, [setDataRegister, user, setList]);

  const registerPoint = useCallback(
    async (dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]) => {
      const data = {
        user_id: user.id,
        date: moment(dataTime.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        location: dataTime.location,
        entry_time: dataTime.entry_time,
        lunch_entry_time: dataTime.lunch_entry_time,
        lunch_out_time: dataTime.lunch_out_time,
        out_time: dataTime.out_time,
        nonbusiness: nonBusiness.length > 0 ? nonBusiness : null,
        consults: consultations.length > 0 ? consultations : null,
        status: 'pending'
      };
      const registerData = await api
        .post(`/checkpoint`, data, {
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
        setUpdateData(true);
      }
    },
    [user, listPoint, setUpdateData]
  );

  const updatePoint = useCallback(
    async (dataTime: timeData, nonBusiness: nonBusinessData[], consultations: consultsData[]) => {
     // console.log('consultations update:: ', consultations);
      const data = {
        user_id: dataTime.user_id,
        date: dataTime.date,
        location: dataTime.location,
        entry_time: dataTime.entry_time,
        lunch_entry_time: dataTime.lunch_entry_time,
        lunch_out_time: dataTime.lunch_out_time,
        out_time: dataTime.out_time,
        nonbusiness: nonBusiness.length > 0 ? nonBusiness : null,
        consults: consultations.length > 0 ? consultations : null,
        status: dataTime.status
      };

      await api
        .put(`/checkpoint/${dataTime.id}`, data, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          //console.log(response.data);
          toast.success('Atualização realizada com sucesso !');
          listPoint();
          setUpdateData(true);
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    [listPoint, setUpdateData, user]
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
        updateData,
        setUpdateData,
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
