import React, { createContext, useContext } from "react";
import "react-toastify/dist/ReactToastify.css"; // css do toast
import { IProps } from "../../../types";

interface HooksReleasePointData {}

const ReleasePointContext = createContext<HooksReleasePointData>(
  {} as HooksReleasePointData
);

const ReleasePointContextProvider: React.FC<IProps> = ({ children }) => {
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
    <ReleasePointContext.Provider value={{}}>
      {children}
    </ReleasePointContext.Provider>
  );
};

function useReleasePoint(): HooksReleasePointData {
  const context = useContext(ReleasePointContext);

  if (!context) {
    throw new Error("useReleasePoint must be used within a useAuth");
  }
  return context;
}

export { ReleasePointContextProvider, useReleasePoint };
