import { decode, encode } from 'js-base64';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
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
  group_id: string;
  entry_time: string;
  lunch_entry_time: string;
  lunch_out_time: string;
  out_time: string;
  password: string;
  status: string;
  admin: number;
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
  namePath: string;
  setNamePath(namePath: string): void;
}

const AuthContext = createContext<HooksAuthData>({} as HooksAuthData);

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [user, setUser] = useState<UserData>({} as UserData);
  const [userCookies, setUserCookies, removeUserCookies] = useCookies(['user']);
  const [namePath, setNamePath] = useState('');
  const navigate = useNavigate();

  const signin = useCallback(
    async (data: dataLogin) => {
      setLoading(true);
      await api
        .post(`/signin`, data)
        .then((response) => {
          setUser(response.data);
          let date = new Date(new Date().setHours(new Date().getHours() + 1));
          const setCookie = {
            id: response.data.id,
            name: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
            group_id: response.data.group_id,
            entry_time: response.data.entry_time,
            lunch_entry_time: response.data.lunch_entry_time,
            lunch_out_time: response.data.lunch_out_time,
            out_time: response.data.out_time,
            password: response.data.password,
            status: response.data.status,
            admin: response.data.admin,
            token: response.data.token
          };

          setUserCookies('user', setCookie, {
            path: '/',
            encode,
            expires: date
          });
        })
        .catch(function (error) {
          //console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
      setLoading(false);
    },
    [setUser, setUserCookies]
  );

  const SignOut = useCallback(() => {
    removeUserCookies('user');
    setUser({} as UserData);
    setShowHome(false);
    // window.location.reload();
  }, [removeUserCookies, setUser, setShowHome]);

  useEffect(() => {
    if (userCookies.user) {
      let userDec: UserData = {} as UserData;
      userDec = JSON.parse(decode(userCookies.user));

      setUser(userDec);
    }
  }, [userCookies]);

  useEffect(() => {
    // Antes de recarregar a página
    window.addEventListener('beforeunload', function (event) {
      // Obtém o pathname atual
      var pathname = window.location.pathname;

      // Armazena o pathname no localStorage
      localStorage.setItem('lastPathname', pathname);
    });

    // Após a página ser carregada
    window.addEventListener('load', function () {
      // Recupera o pathname do localStorage
      var lastPathname = localStorage.getItem('lastPathname');

      if (lastPathname) {
        // Faça o que for necessário com o lastPathname
        navigate(lastPathname);
      }

      // Limpa o lastPathname do localStorage
      localStorage.removeItem('lastPathname');
    });
  }, [navigate]);

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
        SignOut,
        namePath,
        setNamePath
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
