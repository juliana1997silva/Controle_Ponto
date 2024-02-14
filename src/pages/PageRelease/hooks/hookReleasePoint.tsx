import React, { createContext, useCallback, useContext, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { IProps } from '../../../types';
import api from '../../../services/api';
import { UsersData } from '../../PageUsers/hooks/hooksUsers';

interface HooksReleasePointData {
  listUsers(): void;
  dataListUsers: UsersData[];
  setDataListUsers(dataListUsers: UsersData[]): void;
  users: boolean;
  setUsers(users: boolean): void;
  listHoursUsers(id: string): void;
  dataHourUsers: UsersData[];
  setDataHourUsers(dataHourUsers: UsersData[]): void;
  openView: boolean;
  setOpenView(openView: boolean): void;
  releaseHours(id: string, status: string):void;
}

const ReleasePointContext = createContext<HooksReleasePointData>({} as HooksReleasePointData);

const ReleasePointContextProvider: React.FC<IProps> = ({ children }) => {
  const [dataListUsers, setDataListUsers] = useState<UsersData[]>({} as UsersData[]);
  const [dataHourUsers, setDataHourUsers] = useState<UsersData[]>({} as UsersData[]);
  const [users, setUsers] = useState(false);
  const [openView, setOpenView] = useState(false);

  const listUsers = useCallback(async () => {
    await api
      .get(`/users/show`)
      .then((response) => {
        console.log(response.data);
        setDataListUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setUsers(true);
  }, [setDataListUsers, setUsers]);

  const listHoursUsers = useCallback(
    async (id: string) => {
      await api
        .get(`/checkpoint/users/${id}`)
        .then((response) => {
          console.log(response.data);
          setDataHourUsers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setUsers(true);
    },
    [setDataHourUsers, setUsers]
  );

  const releaseHours = useCallback(
    async (id: string, status: string) => {
      await api
        .patch(`/checkpoint/release/${id}`, {
          status: status
        })
        .then((response) => {
          console.log(response.data.data.user_id);
          listHoursUsers(response.data.data.user_id);
        })
        .catch(function (error) {
          console.log(error);
        });
      setUsers(true);
    },
    [ setUsers, listHoursUsers]
  );

  return (
    <ReleasePointContext.Provider
      value={{
        listUsers,
        dataListUsers,
        setDataListUsers,
        users,
        setUsers,
        listHoursUsers,
        dataHourUsers,
        setDataHourUsers,
        openView,
        setOpenView,
        releaseHours
      }}
    >
      {children}
    </ReleasePointContext.Provider>
  );
};

function useReleasePoint(): HooksReleasePointData {
  const context = useContext(ReleasePointContext);

  if (!context) {
    throw new Error('useReleasePoint must be used within a useAuth');
  }
  return context;
}

export { ReleasePointContextProvider, useReleasePoint };
