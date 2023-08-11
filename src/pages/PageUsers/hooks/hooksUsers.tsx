import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface UsersData {
  name?: string;
  phone?: string;
  email?: string;
  entry_time?: string;
  lunch_entry_time?: string;
  lunch_out_time?: string;
  out_time?: string;
  password?: string;
  group_id?: string;
}

interface HooksUsersData {
  RegisterUsers(dataUsers: UsersData): void;
  dataListUsers: UsersData[];
  setDataListUsers(dataListUsers: UsersData[]): void;
  listUsers(): void;
  formDataUser: UsersData;
  setFormDataUser(formDataUser: UsersData): void;
}

const UsersContext = createContext<HooksUsersData>({} as HooksUsersData);

const UsersContextProvider: React.FC<IProps> = ({ children }) => {
  const [dataListUsers, setDataListUsers] = useState<UsersData[]>({} as UsersData[]);
  const [formDataUser, setFormDataUser] = useState<UsersData>({} as UsersData);

  //registra o usuario
  const RegisterUsers = useCallback(async (dataUsers: UsersData) => {
    await api
      .post('/users', dataUsers, {})
      .then((response) => {
        console.log(response.data);
        toast.success('Cadastrado com sucesso');
      })
      .catch((error) => {
        //console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
  }, []);

  //lista os usuarios
  const listUsers = useCallback(async () => {
    await api
      .get('/users')
      .then((response) => {
        console.log(response.data.data);
        setDataListUsers(response.data.data);
      })
      .catch((error) => {
        //console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
  }, [setDataListUsers]);

  //atualizar dados do usuarios
  /*  const listUsers = useCallback(async () => {
    await api
      .get('/usuarios')
      .then((response) => {
        console.log(response.data.data);
        setDataListUsers(response.data.data);
      })
      .catch((error) => {
        //console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
  }, [setDataListUsers]); */

  return (
    <UsersContext.Provider value={{ RegisterUsers, dataListUsers, setDataListUsers, listUsers, formDataUser, setFormDataUser }}>
      {children}
    </UsersContext.Provider>
  );
};

function useUsers(): HooksUsersData {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers must be used within a useUsers');
  }
  return context;
}

export { UsersContextProvider, useUsers };
