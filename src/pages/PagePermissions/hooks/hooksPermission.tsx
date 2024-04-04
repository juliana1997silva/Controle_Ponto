import React, { createContext, useCallback, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../hooks/hooksAuth';
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
  createdPermission(data: PermissionsData, file: File): void;
}

const PermissionsContext = createContext<HooksPermissionsData>({} as HooksPermissionsData);

const PermissionsContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const uploadImage = useCallback(
    async (data: PermissionsData, file: File) => {
      setLoading(true);

      const formData = new FormData();
      formData.append('images', file);

      const dataUsers = await api
        .post(`/permission`, formData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .catch((error) => {
          ////console.log(error);
        });

      if (dataUsers) {
        console.log(dataUsers.data);
      }
      setLoading(false);
    },
    [user, setLoading]
  );

  const createdPermission = useCallback(
    async (data: PermissionsData, file: File) => {
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
        uploadImage(permissions.data, file);
      }
      setLoading(false);
    },
    [user, setLoading, uploadImage]
  );

  if (loading) {
    return <Loading />;
  }
  return (
    <PermissionsContext.Provider
      value={{
        createdPermission
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
