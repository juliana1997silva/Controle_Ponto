import React, { createContext, useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css"; // css do toast
import { IProps } from "../../../types";

export interface dataForm {
  id: string;
  date?: any;
  entry_time?: string;
  location?: string;
  lunch_entry_time?: string;
  lunch_out_time?: string;
  out_time?: string;
  status?: string | null;
  activities: dataConsult[];
  hour_commercial: dataHourCommercial[];
}

export interface dataConsult {
  consult?: string;
  description?: string;
}

export interface dataHourCommercial {
  entry_time_commercial?: string;
  lunch_entry_time_commercial?: string;
  lunch_out_time_commercial?: string;
  out_time_commercial?: string;
}

interface HooksCheckPointData {
  openModal: boolean;
  setOpenModal(openModal: boolean): void;
  dataModal: dataForm;
  setDataModal(dataModal: dataForm): void;
  commercialData: dataHourCommercial;
  setCommercialData(commercialData: dataHourCommercial): void;
  commercial: dataHourCommercial[];
  setCommercial(commercial: dataHourCommercial[]): void;
  openCommercial: boolean;
  setOpenCommercial(openCommercial: boolean): void;
}

const CheckPointContext = createContext<HooksCheckPointData>(
  {} as HooksCheckPointData
);

const CheckPointContextProvider: React.FC<IProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<dataForm>({} as dataForm);
  const [commercialData, setCommercialData] = useState<dataHourCommercial>(
    {} as dataHourCommercial
  );
  const [commercial, setCommercial] = useState<dataHourCommercial[]>([]);
  const [openCommercial, setOpenCommercial] = useState(false);
  /* const login = useCallback(
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
  ); */

  return (
    <CheckPointContext.Provider
      value={{
        openModal,
        setOpenModal,
        dataModal,
        setDataModal,
        commercialData,
        setCommercialData,
        commercial,
        setCommercial,
        openCommercial,
        setOpenCommercial,
      }}
    >
      {children}
    </CheckPointContext.Provider>
  );
};

function useCheckPoint(): HooksCheckPointData {
  const context = useContext(CheckPointContext);

  if (!context) {
    throw new Error("useCheckPoint must be used within a useAuth");
  }
  return context;
}

export { CheckPointContextProvider, useCheckPoint };
