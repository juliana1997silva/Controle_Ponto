import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserData, useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';
import { GroupsData } from '../../PageGroups/hooks/hooksGroups';

export interface UserGroupsData {
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
  team_id?: string | any;
  manager?: boolean;
  user_interpres_code?: string;
}


interface HooksUserGroupsData {
  listGroups(): void;
  groupsData: GroupsData[];
  setGroupsData(groupsData: GroupsData[]): void;
  list: boolean;
  setList(list: boolean): void;
  usersData: UserData[];
  setUsersData(usersData: UserData[]): void;
  listUsersGroups(id: string): void;
};

const UserGroupsContext = createContext<HooksUserGroupsData>({} as HooksUserGroupsData);

const UserGroupsContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [groupsData, setGroupsData] = useState<GroupsData[]>({} as GroupsData[]);
  const [list, setList] = useState(false);
  const [usersData, setUsersData] = useState<UserData[]>({} as UserData[]);
 
  const listGroups = useCallback(async () => {
    const dataGroup = await api
      .get('/groups', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });

    if (dataGroup) {
      setGroupsData(dataGroup.data);
    }
    setList(true);
  }, [user, setGroupsData, setList]);

  const listUsersGroups = useCallback(async (id: string) => {
    const dataUsers = await api
      .get(`/users/list/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });

    if (dataUsers) {
      setUsersData(dataUsers.data);
    }
  }, [user, setUsersData, setList]);

  return (
    <UserGroupsContext.Provider
      value={{
        groupsData,
        setGroupsData,
        listGroups,
        list,
        setList,
        usersData,
        setUsersData,
        listUsersGroups
      }}
    >
      {children}
    </UserGroupsContext.Provider>
  );
};

function useUserGroups(): HooksUserGroupsData {
  const context = useContext(UserGroupsContext);

  if (!context) {
    throw new Error('useUserGroups must be used within a useUserGroups');
  }
  return context;
}

export { UserGroupsContextProvider, useUserGroups };
