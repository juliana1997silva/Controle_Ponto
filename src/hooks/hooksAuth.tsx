import { decode, encode } from 'js-base64';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/Loading';
import api from '../services/api';
import { IProps } from '../types';
import { Roles, RolesInput, RolesSelect } from '../types/permissions';

export interface dataLogin {
  email?: string;
  password?: string;
}

export interface UserData {
  id: string;
  name: string;
  phone: string;
  email: string;
  team_id: string | any;
  entry_time: string;
  lunch_entry_time: string;
  lunch_out_time: string;
  out_time: string;
  password: string;
  status: string;
  admin: number;
  token: string;
  manager: number;
  user_interpres_code: string;
  permissions: string[];
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
  loading: boolean;
  setLoading(loading: boolean): void;
  expanded: boolean;
  setExpanded(expanded: boolean): void;
  getRole(role: Roles | RolesInput | RolesSelect): boolean;
  getCookie(name: string): string;
  list: boolean;
  setList(list: boolean): void;
}

const AuthContext = createContext<HooksAuthData>({} as HooksAuthData);

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
  const [wHeight, setWHeight] = useState(window.innerHeight);
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [user, setUser] = useState<UserData>({} as UserData);
  const [userCookies, setUserCookies, removeUserCookies] = useCookies(['user', 'permissions']);
  const [namePath, setNamePath] = useState('');
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const [list, setList] = useState(false);
  

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
            team_id: response.data.team_id,
            entry_time: response.data.entry_time,
            lunch_entry_time: response.data.lunch_entry_time,
            lunch_out_time: response.data.lunch_out_time,
            out_time: response.data.out_time,
            password: response.data.password,
            status: response.data.status,
            admin: response.data.admin,
            token: response.data.token,
            manager: response.data.manager,
            user_interpres_code: response.data.user_interpres_code,
            permissions: response.data.permissions
          };

          setUserCookies('user', setCookie, {
            path: '/',
            encode,
            expires: date
          });
          setUserCookies('permissions', response.data.permissions, {
            path: '/',
            encode,
            expires: date
          });
        })
        .catch(function (error) {
          //console.log(error.response.data.message);
          if (error.response) toast.error(error.response.data.message);
        });
      setLoading(false);
    },
    [setUser, setUserCookies]
  );

  const SignOut = useCallback(() => {
    removeUserCookies('user');
    removeUserCookies('permissions');
    setUser({} as UserData);
    setShowHome(false);
    // window.location.reload();
  }, [removeUserCookies, setUser, setShowHome]);

  const getRole = useCallback(
    (role: string) => {
      if (user) {
        if (user.permissions) {
          const isRole = user.permissions.find((manage) => manage === role);
          if (isRole && isRole === role) return true;
        }
        if (user.permissions) {
          const isRole = user.permissions.find((permission) => permission === role);
          if (isRole && isRole === role) return true;
        }
      }

      setWHeight(window.innerHeight - 165);
      return false;
    },
    [user]
  );

  const getCookie = useCallback((cname: string) => {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }, []);

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
        setNamePath,
        loading,
        setLoading,
        expanded,
        setExpanded,
        getRole,
        getCookie,
        list,
        setList
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
