import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';
import Loading from '../../../components/Loading';

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
  admin?: boolean;
  team_id?: string;
  manager?: boolean;
  user_interpres_code?: string;
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
  list: boolean;
  setList(list: boolean): void;
  releaseUsers(id: string): void;
  showRegister: boolean;
  setShowRegister(showRegister: boolean): void;
  coordinatorData: UsersData[];
  setCoordinatorData(coordinatorData: UsersData[]): void;
  listCoordinator(): void;
  listCoordinatorData: boolean;
  setListCoordinatorData(listCoordinatorData: boolean): void;
}

const UsersContext = createContext<HooksUsersData>({} as HooksUsersData);

const UsersContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [dataListUsers, setDataListUsers] = useState<UsersData[]>({} as UsersData[]);
  const [formDataUser, setFormDataUser] = useState<UsersData>({} as UsersData);
  const [showUsersList, setShowUsersList] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [list, setList] = useState(false);
  const [listCoordinatorData, setListCoordinatorData] = useState(false);
  const [coordinatorData, setCoordinatorData] = useState<UsersData[]>({} as UsersData[]);
 const [loading, setLoading] = useState(false);
  //lista os grupos
  const listCoordinator = useCallback(async () => {
    await api
      .get('/group', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        //console.log('group::', response.data);
        setCoordinatorData(response.data);
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
    setListCoordinatorData(true);
  }, [setCoordinatorData, setListCoordinatorData, user]);

  //lista os usuarios
  const listUsers = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/users`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        setDataListUsers(response.data);
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });

    setList(true);
    setLoading(false);
  }, [setDataListUsers, setList, user, setLoading]);

  //registra o usuario
  const RegisterUsers = useCallback(
    async (dataUsers: UsersData) => {
      await api
        .post(
          '/users',
          {
            name: dataUsers.name,
            phone: dataUsers.phone,
            email: dataUsers.email,
            entry_time: dataUsers.entry_time,
            lunch_entry_time: dataUsers.lunch_entry_time,
            lunch_out_time: dataUsers.lunch_out_time,
            out_time: dataUsers.out_time,
            password: dataUsers.password,
            admin: dataUsers.admin === true ? 1 : 0,
            team_id: dataUsers.team_id,
            manager: dataUsers.manager,
            user_interpres_code: dataUsers.user_interpres_code
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          // //console.log(response.data);
          toast.success(response.data);
          setShowUsersList(true);
          listUsers();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listUsers, setShowUsersList, user]
  );

  //atualizar dados do usuarios
  const updateUsers = useCallback(
    async (dataUser: UsersData) => {
      await api
        .put(
          `/users/${dataUser.id}`,
          {
            name: dataUser.name,
            phone: dataUser.phone,
            email: dataUser.email,
            entry_time: dataUser.entry_time,
            lunch_entry_time: dataUser.lunch_entry_time,
            lunch_out_time: dataUser.lunch_out_time,
            out_time: dataUser.out_time,
            admin: dataUser.admin === true ? 1 : 0,
            team_id: dataUser.team_id,
            manager: dataUser.manager,
            user_interpres_code: dataUser.user_interpres_code
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          ////console.log(response.data.data);
          toast.success('Atualizado com sucesso!');
          setShowUsersList(true);
          listUsers();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listUsers, setShowUsersList, user]
  );

  //atualizar status
  const releaseUsers = useCallback(
    async (id: string) => {
      await api
        .patch(
          `/users/release/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          // //console.log(response.data.data);
          listUsers();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listUsers, user]
  );

  if (loading) {
    return <Loading />;
  }

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
        setMode,
        list,
        setList,
        releaseUsers,
        showRegister,
        setShowRegister,
        coordinatorData,
        setCoordinatorData,
        listCoordinator,
        listCoordinatorData,
        setListCoordinatorData,
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
