import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface GroupsData {
  id?: string;
  name?: string;
  level?: string;
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
  const [dataGroups, setDataGroups] = useState<GroupsData[]>({} as GroupsData[]);
  const [list, setList] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [groupStore, setGroupStore] = useState<GroupsData>({} as GroupsData);

  //lista
  const listGroups = useCallback(async () => {
    await api
      .get('/group')
      .then((response) => {
        console.log(response.data);
        setDataGroups(response.data.data);
        setList(true);
      })
      .catch((error) => {
        //console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
  }, [setDataGroups, setList]);

  //criar
  const createdGroup = useCallback(
    async (dataGroup: GroupsData) => {
      await api
        .post('/group', dataGroup)
        .then((response) => {
          console.log(response.data);
          toast.success('Grupo cadastrado com sucesso !');
          listGroups();
        })
        .catch((error) => {
          //console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups]
  );

  //editar
  const updateGroup = useCallback(
    async (dataGroup: GroupsData) => {
      await api
        .put(`/group/${dataGroup.id}`, dataGroup)
        .then((response) => {
          console.log(response.data);
          toast.success('Grupo atualizado com sucesso !');
          listGroups();
        })
        .catch((error) => {
          //console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups]
  );

  //atualizar status
  const releaseGroup = useCallback(
    async (id: string) => {
      await api
        .patch(`/group/release/${id}`)
        .then((response) => {
          console.log(response.data);
          listGroups();
        })
        .catch((error) => {
          //console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listGroups]
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