import { EventInput } from '@fullcalendar/core';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import { useAuth } from '../../../hooks/hooksAuth';
import api from '../../../services/api';
import { IProps } from '../../../types';
import Loading from '../../../components/Loading';

export interface EventsData {
  id?: string;
  user_id?: string;
  title?: string;
  backgroundColor?: string;
  allDay?: boolean | number;
  start?: Date | string | null;
  end?: Date | string | null;
  updated_at?: string;
  created_at?: string;
}

interface HooksCalendarData {
  createEvents(data: EventsData): void;
  dataEvents: EventInput[];
  setDataEvents(dataEvents: EventInput[]): void;
  listEvents(): void;
  mode: 'create' | 'edit';
  setMode(mode: 'create' | 'edit'): void;
  list: boolean;
  setList(list: boolean): void;
  openModal: boolean;
  setOpenModal(openModal: boolean): void;
  updateEvents(data: EventsData): void;
  showEvents(id:string): void;
}

const CalendarContext = createContext<HooksCalendarData>({} as HooksCalendarData);

const CalendarContextProvider: React.FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataEvents, setDataEvents] = useState<EventInput[]>([] as EventInput[]);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [list, setList] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const listEvents = useCallback(async () => {
    setLoading(true);
    await api
      .get(`/events`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then((response) => {
        //console.log(response.data);
        setDataEvents(response.data);
      })
      .catch(function (error) {
        //console.log(error);
      });
    setList(true);
    setLoading(false);
  }, [setDataEvents, setList, user, setLoading]);

  const createEvents = useCallback(
    async (data: EventsData) => {
      await api
        .post(
          `/events`,
          {
            title: data.title,
            start: data.start,
            end: data.end,
            backgroundColor: data.backgroundColor,
            allDay: data.allDay === undefined ? false : true
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          //console.log(response.data);
          toast.success(response.data);
          listEvents();
          setOpenModal(false);
          //window.location.reload();
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    [listEvents, setOpenModal, user]
  );

  const updateEvents = useCallback(
    async (data: EventsData) => {
      await api
        .put(
          `/events/${data.id}`,
          {
            title: data.title,
            start: data.start,
            end: data.end,
            backgroundColor: data.backgroundColor,
            allDay: data.allDay
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          //console.log(response.data);
          toast.success(response.data);
          listEvents();
          setOpenModal(false);
          //window.location.reload();
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    [listEvents, setOpenModal, user]
  );

  const showEvents = useCallback(
    async (id: string) => {
      await api
        .get(
          `/events/${id}`,

          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((response) => {
          setDataEvents(response.data);
        })
        .catch(function (error) {
          //console.log(error);
        });
    },
    [user, setDataEvents]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <CalendarContext.Provider
      value={{
        createEvents,
        dataEvents,
        setDataEvents,
        listEvents,
        mode,
        setMode,
        list,
        setList,
        openModal,
        setOpenModal,
        updateEvents,
        showEvents
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

function useCalendar(): HooksCalendarData {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendar must be used within a useAuth');
  }
  return context;
}

export { CalendarContextProvider, useCalendar };
