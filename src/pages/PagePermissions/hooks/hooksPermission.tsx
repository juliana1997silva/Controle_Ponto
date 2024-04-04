import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import api from '../../../services/api';
import { IProps } from '../../../types';

export interface PermissionsData {
  name?: string;
  id?: string;
  description?: string;
  image?: string | File;
  status?: boolean | number;
}

interface HooksPermissionsData {
  createdPermission(data: PermissionsData, file?: File): void;
  listPermissions(): void;
  list: boolean;
  setList(list: boolean): void;
  dataPermissions: PermissionsData[];
  setDataPermissions(dataPermissions: PermissionsData[]): void;
  mode: 'create' | 'edit';
  setMode(mode: 'create' | 'edit'): void;
  dataPermissionsStore: PermissionsData;
  setDataPermissionsStore(dataPermissionsStore: PermissionsData): void;
  updatePermission(data: PermissionsData, file?: File): void;
  deletePermission(idPermission: string): void;
}

const PermissionsContext = createContext<HooksPermissionsData>({} as HooksPermissionsData);

const PermissionsContextProvider: React.FC<IProps> = ({ children }) => {
  //const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);
  const[dataPermissions, setDataPermissions] = useState<PermissionsData[]>({} as PermissionsData[]);
  const [mode, setMode] = useState<"create" | "edit">("create")
  const [dataPermissionsStore, setDataPermissionsStore] = useState<PermissionsData>({} as PermissionsData);

  const listPermissions = useCallback(async () => {
    const dataPermission = await api
      .get(`/permission`, {
        headers: {
          //Authorization: `Bearer ${user.token}`
        }
      })
      .catch((error) => {
        ////console.log(error);
      });

    if (dataPermission) {
      console.log(dataPermission.data);
      setDataPermissions(dataPermission.data);
    }
    setList(true);
  }, [ setList, setDataPermissions]);

  const uploadImage = useCallback(
    async (data: PermissionsData, file: File) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('images', file);

      const imageData = await api
        .post(`/permission/${data.id}/images`, formData, {
          headers: {
            //Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .catch((error) => {
          ////console.log(error);
        });

      if (imageData) {
        toast.success('Permissão criada com sucesso');
        listPermissions();
      }
      setLoading(false);
    },
    [setLoading, listPermissions]
  );

  const createdPermission = useCallback(
    async (data: PermissionsData, file?: File) => {
      setLoading(true);
      const dataPermission = {
        name: data.name,
        description: data.description
      };
      const permissions = await api
        .post(`/permission`, dataPermission, {
          /* headers: {
            Authorization: `Bearer ${user.token}`
          }*/
        })
        .catch((error) => {
          ////console.log(error);
        });

      if (permissions) {
        console.log(permissions.data);
        if (file) {
          uploadImage(permissions.data, file);
        } else {
          toast.success('Permissão criada com sucesso');
          listPermissions();
        }
      }
      setLoading(false);
    },
    [setLoading, uploadImage, listPermissions]
  );

  const updatePermission = useCallback(
    async (data: PermissionsData, file?: File) => {
      setLoading(true);
      const dataPermission = {
        name: data.name,
        description: data.description
      };
      const permissions = await api
        .put(`/permission/${data.id}`, dataPermission, {
          /* headers: {
            Authorization: `Bearer ${user.token}`
          }*/
        })
        .catch((error) => {
          ////console.log(error);
        });

      if (permissions) {
        console.log(permissions.data);
        if (file) {
          uploadImage(permissions.data, file);
        } else {
          toast.success('Permissão atualizada com sucesso');
          listPermissions();
        }
      }
      setLoading(false);
    },
    [setLoading, uploadImage, listPermissions]
  );

  const deletePermission = useCallback(
    async (idPermission: string) => {
      setLoading(true);
      const permissions = await api
        .delete(`/permission/${idPermission}`, {
          /* headers: {
            Authorization: `Bearer ${user.token}`
          }*/
        })
        .catch((error) => {
          ////console.log(error);
        });

      if (permissions) {
        toast.success('Permissão deletada com sucesso');
        listPermissions();
      }
      setLoading(false);
    },
    [setLoading, listPermissions]
  );

  

  if (loading) {
    return <Loading />;
  }
  return (
    <PermissionsContext.Provider
      value={{
        createdPermission,
        listPermissions,
        list,
        setList,
        dataPermissions,
        setDataPermissions,
        mode,
        setMode,
        dataPermissionsStore,
        setDataPermissionsStore,
        updatePermission,
        deletePermission
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

function usePermissions(): HooksPermissionsData {
  const context = useContext(PermissionsContext);

  if (!context) {
    throw new Error('usePermissions must be used within a usePermissions');
  }
  return context;
}

export { PermissionsContextProvider, usePermissions };
