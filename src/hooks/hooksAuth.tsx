import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import api from '../services/api';
import { IProps } from '../types';
import { useCookies } from 'react-cookie';
import { encode, decode } from 'js-base64';
import { toast } from 'react-toastify';

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
  const [userCookies, setUserCookie, removeUserCookie] = useCookies(['user']);

  const signin = useCallback(
    async (data: dataLogin) => {
      setLoading(true);
      await api
        .post(`/signin`, data)
        .then((response) => {
          //console.log(response.data);
          setShowHome(true);
          setUser(response.data);
          let date = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
          const setCookie = {
            id: response.data.user.id,
            name: response.data.user.name,
            phone: response.data.user.phone,
            email: response.data.user.email,
            coordinator_id: response.data.user.coordinator_id,
            entry_time: response.data.user.entry_time,
            lunch_entry_time: response.data.user.lunch_entry_time,
            lunch_out_time: response.data.user.lunch_out_time,
            out_time: response.data.user.out_time,
            password: response.data.user.password,
            status: response.data.user.status,
            admin: response.data.user.admin,
            token: response.data.token
          };

          setUserCookie('user', setCookie, {
            path: '/',
            encode: encode as (src: string, urlsafe?: boolean | undefined) => string,
            expires: date
          } as { path: string; encode: (src: string, urlsafe?: boolean | undefined) => string; expires: Date });
        })
        .catch(function (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
      setLoading(false);
    },
    [setShowHome, setUser, setUserCookie]
  );

  const SignOut = useCallback(() => {
    removeUserCookie('user');
    window.location.reload();
  }, [removeUserCookie]);

  /* useEffect(() => {
    if (userCookies.user) {
      let userDec: UserData = {} as UserData;
      userDec = JSON.parse(decode(userCookies.user));
      setUser(userDec);
    }
  }, [userCookies]); */

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
