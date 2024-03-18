import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface GroupsData {
  id?: string;
  name?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface HooksGroupsData {
  dataGroups: GroupsData[];
  setDataGroups(dataGroups: GroupsData[]): void;
  listGroups(): void;
  list: boolean;
  setList(list: boolean): void;
  mode: 'create' | 'edit';
  setMode(mode: 'create' | 'edit'): void;
  createdGroup(dataGroup: GroupsData): void;
  groupStore: GroupsData;
  setGroupStore(groupStore: GroupsData): void;
  updateGroup(dataGroup: GroupsData): void;
  releaseGroup(id: string): void;
}

const GroupsContext = createContext<HooksGroupsData>({} as HooksGroupsData);

const GroupsContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [dataGroups, setDataGroups] = useState<GroupsData[]>({} as GroupsData[]);
  const [list, setList] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [groupStore, setGroupStore] = useState<GroupsData>({} as GroupsData);

  //lista
  const listGroups = useCallback(async () => {
    await api
      .get('/group', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        setDataGroups(response.data);
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
    setList(true);
  }, [setDataGroups, setList, user]);

  //criar
  const createdGroup = useCallback(
    async (dataGroup: GroupsData) => {
      await api
        .post('/group', dataGroup, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          // //console.log(response.data);
          toast.success('Grupo cadastrado com sucesso !');
          listGroups();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups, user]
  );

  //editar
  const updateGroup = useCallback(
    async (dataGroup: GroupsData) => {
      await api
        .put(`/group/${dataGroup.id}`, dataGroup, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then((response) => {
          // //console.log(response.data);
          toast.success(response.data);
          listGroups();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups, user]
  );

  //atualizar status
  const releaseGroup = useCallback(
    async (id: string) => {
      await api
        .patch(
          `/group/release/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          // //console.log(response.data);
          listGroups();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups, user]
  );

  return (
    <GroupsContext.Provider
      value={{
        listGroups,
        dataGroups,
        setDataGroups,
        list,
        setList,
        mode,
        setMode,
        createdGroup,
        groupStore,
        setGroupStore,
        updateGroup,
        releaseGroup
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

function useGroups(): HooksGroupsData {
  const context = useContext(GroupsContext);

  if (!context) {
    throw new Error('useGroups must be used within a useGroups');
  }
  return context;
}

export { GroupsContextProvider, useGroups };
