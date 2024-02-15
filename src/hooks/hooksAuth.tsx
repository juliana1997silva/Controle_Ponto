import { decode, encode } from 'js-base64';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import api from '../services/api';
import { IProps } from '../types';

export interface dataLogin {
  email?: string;
  password?: string;
}

export interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  coordinator_id: string;
  entry_time: string;
  lunch_entry_time: string;
  lunch_out_time: string;
  out_time: string;
  password: string;
  status: string;
  admin: string;
  token: string;
}

interface HooksAuthData {
  signin(data: dataLogin): void;
  showHome: boolean;
  setShowHome(showHome: boolean): void;
  user: UserData;
  setUser(user: UserData): void;
  errorLogin: boolean;
  setErrorLogin(errorLogin: boolean): void;
  SignOut(): void;
}

const AuthContext = createContext<HooksAuthData>({} as HooksAuthData);

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [user, setUser] = useState<UserData>({} as UserData);
  const [userCookies, setUserCookies, removeUserCookies] = useCookies(['user']);

  const signin = useCallback(
    async (data: dataLogin) => {
      setLoading(true);
      await api
        .post(`/signin`, data)
        .then((response) => {
          setUser(response.data);
          let date = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
          const setCookie = {
            id: response.data.id,
            name: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
            coordinator_id: response.data.coordinator_id,
            entry_time: response.data.entry_time,
            lunch_entry_time: response.data.lunch_entry_time,
            lunch_out_time: response.data.lunch_out_time,
            out_time: response.data.out_time,
            password: response.data.password,
            status: response.data.status,
            admin: response.data.admin,
            token: response.data.token
          };

          const encodedData = btoa(JSON.stringify(setCookie));

          setUserCookies('user', encodedData, {
            path: '/',
            expires: date,
            sameSite: 'none', // ou 'Lax', dependendo do seu caso
            secure: true
          });
          setShowHome(true);
          //navigate('/dashboard');
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
      setLoading(false);
    },
    [setUser, setUserCookies, setShowHome]
  );

  const SignOut = useCallback(() => {
    removeUserCookies('user');
    setUser({} as UserData);
    // window.location.reload();
  }, [removeUserCookies, setUser]);

  useEffect(() => {
    if (userCookies.user) {
      try {
        const decodedUser = decode(userCookies.user);
        const parsedUser = JSON.parse(decodedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error decoding or parsing user:', error);
        // Lidar com o erro, por exemplo, remover o cookie inválido
        removeUserCookies('user');
      }
    }
  }, [userCookies]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        signin,
        showHome,
        setShowHome,
        user,
        setUser,
        errorLogin,
        setErrorLogin,
        SignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): HooksAuthData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a useAuth');
  }
  return context;
}

export { AuthContextProvider, useAuth };
