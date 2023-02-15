import React, { createContext, useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // css do toast
import api from "../services/api";
import { IProps } from "../types";

export interface dataLogin {
  login?: string;
  password?: string;
}
interface IUserData {
  logged: boolean;
  user: UserData;
}

interface UserData {
  id: number;
  is_admin: boolean;
  login: string;
  name: string;
  roles: RolesData;
  parameter: ParameterData;
}

interface RolesData {
  adm: boolean;
  adm_site: boolean;
  event: boolean;
  finance: boolean;
  knights: boolean;
  list: boolean;
  request: boolean;
  user: boolean;
}
interface ParameterData {
  entry_time: string;
  lunch_entry_time: string;
  lunch_out_time: string;
  out_time: string;
}

interface HooksAuthData {
  login(data: dataLogin): void;
  showHome: boolean;
  setShowHome(showHome: boolean): void;
  user: IUserData;
  setUser(user: IUserData): void;
  dataForm: dataLogin;
  setDataForm(dataForm: dataLogin): void;
  errorLogin: boolean;
  setErrorLogin(errorLogin: boolean): void;
}

const AuthContext = createContext<HooksAuthData>({} as HooksAuthData);

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [user, setUser] = useState<IUserData>({} as IUserData);
  const [dataForm, setDataForm] = useState<dataLogin>({} as dataLogin);

  const login = useCallback(
    async (data: dataLogin) => {
      const loginData = await api
        .post(`/v1/user/auth`, data)
        .catch(function (error) {
          console.log(error);
        });

      if (loginData) {
        console.log(loginData.data);
        if (loginData.data.logged === true) {
          setUser(loginData.data);
          setShowHome(true);
        } else {
          toast.error("Tente Novamente !");
        }
      }
    },
    [setUser, setShowHome]
  );

  return (
    <AuthContext.Provider
      value={{
        login,
        showHome,
        setShowHome,
        user,
        setUser,
        dataForm,
        setDataForm,
        errorLogin,
        setErrorLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): HooksAuthData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a useAuth");
  }
  return context;
}

export { AuthContextProvider, useAuth };
