import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
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
}

const AuthContext = createContext<HooksAuthData>({} as HooksAuthData);

const AuthContextProvider: React.FC<IProps> = ({ children }) => {
  const [showHome, setShowHome] = useState(false);
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
        if (!loginData.data.logged) {
          window.location.reload();
          toast.error("Erro ao realizar Login");
        }
        setUser(loginData.data);
        setShowHome(true);
      }
    },
    [setUser, setShowHome, dataForm, user]
  );

  useEffect(() => {
    console.log(user);
  }, [user]);

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
