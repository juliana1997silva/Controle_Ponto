import React, { createContext, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { IProps } from '../../../types';

interface HooksProfileData {
  showModalPassword: boolean;
  setShowModalPassword(showModalPassword: boolean): void;
}

const ProfileContext = createContext<HooksProfileData>({} as HooksProfileData);

const ProfileContextProvider: React.FC<IProps> = ({ children }) => {
  const [showModalPassword, setShowModalPassword] = useState(false);
  /* const login = useCallback(
    async (data: dataLogin) => {
      const loginData = await api
        .post(`/v1/user/auth`, data)
        .catch(function (error) {
          //console.log(error);
        });

      if (loginData) {
        //console.log(loginData.data);
        if (loginData.data.logged === true) {
          setUser(loginData.data);
          setShowHome(true);
        } else {
          toast.error("Tente Novamente !");
        }
      }
    },
    [setUser, setShowHome]
  ); */

  return (
    <ProfileContext.Provider
      value={{
        showModalPassword,
        setShowModalPassword
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
