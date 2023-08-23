import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface UsersData {
  name?: string;
  id?: string;
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
  updateUsers(dataUser: UsersData): void;
  showUsersList: boolean;
  setShowUsersList(showUsersList: boolean): void;
  mode: 'create' | 'edit';
  setMode(mode: 'create' | 'edit'): void;
}

const UsersContext = createContext<HooksUsersData>({} as HooksUsersData);

const UsersContextProvider: React.FC<IProps> = ({ children }) => {
  const [dataListUsers, setDataListUsers] = useState<UsersData[]>({} as UsersData[]);
  const [formDataUser, setFormDataUser] = useState<UsersData>({} as UsersData);
  const [showUsersList, setShowUsersList] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create")

  //registra o usuario
  const RegisterUsers = useCallback(
    async (dataUsers: UsersData) => {
      await api
        .post('/users', dataUsers, {})
        .then((response) => {
          console.log(response.data);
          toast.success('Cadastrado com sucesso');
          setShowUsersList(!showUsersList);
        })
        .catch((error) => {
          //console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [setShowUsersList, showUsersList]
  );

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
  const updateUsers = useCallback(
    async (dataUser: UsersData) => {
      await api
        .put(`/users/${dataUser.id}`)
        .then((response) => {
          console.log(response.data.data);
          toast.success('Atualizado com sucesso!');
          setShowUsersList(!showUsersList);
          listUsers();
        })
        .catch((error) => {
          //console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [setDataListUsers, listUsers, setShowUsersList, showUsersList]
  );

  return (
    <UsersContext.Provider
      value={{
        RegisterUsers,
        dataListUsers,
        setDataListUsers,
        listUsers,
        formDataUser,
        setFormDataUser,
        updateUsers,
        showUsersList,
        setShowUsersList,
        mode,
        setMode
      }}
    >
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
