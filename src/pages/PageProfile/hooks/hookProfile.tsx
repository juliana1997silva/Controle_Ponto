import React, { createContext, useCallback, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { IProps } from '../../../types';
import api from '../../../services/api';
import { useAuth } from '../../../hooks/hooksAuth';
import { toast } from 'react-toastify';

export interface dataPassword {
  password?: string;
  new_password?: string;
  confirmation_password?: string;
}

interface HooksProfileData {
  showModalPassword: boolean;
  setShowModalPassword(showModalPassword: boolean): void;
  forgoutPassword(data: dataPassword): void;
}

const ProfileContext = createContext<HooksProfileData>({} as HooksProfileData);

const ProfileContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [showModalPassword, setShowModalPassword] = useState(false);

  const forgoutPassword = useCallback(
    async (data: dataPassword) => {
      const passwordData = await api
        .post(
          `/forgout`,
          {
            email: user.email,
            password: data.password,
            new_password: data.new_password,
            confirmation_password: data.confirmation_password
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .catch(function (error) {
          //console.log(error);
        });

      if (passwordData) {
        toast.success(passwordData.data);
        setShowModalPassword(false);
      }
    },
    [user, setShowModalPassword]
  );

  return (
    <ProfileContext.Provider
      value={{
        showModalPassword,
        setShowModalPassword,
        forgoutPassword
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): HooksProfileData {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a useAuth');
  }
  return context;
}

export { ProfileContextProvider, useProfile };
