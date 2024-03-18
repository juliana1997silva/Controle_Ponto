import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface CoordinatorData {
  id?: string;
  name?: string;
  team_id?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface HooksCoordinatorData {
  dataCoordinator: CoordinatorData[];
  setDataCoordinator(dataCoordinator: CoordinatorData[]): void;
  listCoordinator(): void;
  list: boolean;
  setList(list: boolean): void;
  mode: 'create' | 'edit';
  setMode(mode: 'create' | 'edit'): void;
  createdCoordinator(dataCoordinator: CoordinatorData): void;
  coordinatorStore: CoordinatorData;
  setCoordinatorStore(Coordinatortore: CoordinatorData): void;
  updateCoordinator(dataCoordinator: CoordinatorData): void;
  releaseCoordinator(id: string): void;
}

const CoordinatorContext = createContext<HooksCoordinatorData>({} as HooksCoordinatorData);

const CoordinatorContextProvider: React.FC<IProps> = ({ children }) => {
  const [dataCoordinator, setDataCoordinator] = useState<CoordinatorData[]>({} as CoordinatorData[]);
  const [list, setList] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [coordinatorStore, setCoordinatorStore] = useState<CoordinatorData>({} as CoordinatorData);

  //lista
  const listCoordinator = useCallback(async () => {
    await api
      .get('/manager')
      .then((response) => {
        //(response.data);
        setDataCoordinator(response.data.data);
        setList(true);
      })
      .catch((error) => {
        ////console.log(error);
        toast.error('Ocorreu um erro. Tente Novamente!');
      });
  }, [setDataCoordinator, setList]);

  //criar
  const createdCoordinator = useCallback(
    async (dataCoordinator: CoordinatorData) => {
      await api
        .post('/manager', dataCoordinator)
        .then((response) => {
          ////console.log(response.data);
          toast.success('Grupo cadastrado com sucesso !');
          listCoordinator();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listCoordinator]
  );

  //editar
  const updateCoordinator = useCallback(
    async (dataCoordinator: CoordinatorData) => {
      await api
        .put(`/manager/${dataCoordinator.id}`, dataCoordinator)
        .then((response) => {
          // //console.log(response.data);
          toast.success('Grupo atualizado com sucesso !');
          listCoordinator();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listCoordinator]
  );

  //atualizar status
  const releaseCoordinator = useCallback(
    async (id: string) => {
      await api
        .patch(`/manager/release/${id}`)
        .then((response) => {
          ////console.log(response.data);
          listCoordinator();
        })
        .catch((error) => {
          ////console.log(error);
          toast.error('Ocorreu um erro. Tente Novamente!');
        });
    },
    [listCoordinator]
  );

  return (
    <CoordinatorContext.Provider
      value={{
        listCoordinator,
        dataCoordinator,
        setDataCoordinator,
        list,
        setList,
        mode,
        setMode,
        createdCoordinator,
        coordinatorStore,
        setCoordinatorStore,
        updateCoordinator,
        releaseCoordinator
      }}
    >
      {children}
    </CoordinatorContext.Provider>
  );
};

function useCoordinator(): HooksCoordinatorData {
  const context = useContext(CoordinatorContext);

  if (!context) {
    throw new Error('useCoordinator must be used within a useCoordinator');
  }
  return context;
}

export { CoordinatorContextProvider, useCoordinator };
