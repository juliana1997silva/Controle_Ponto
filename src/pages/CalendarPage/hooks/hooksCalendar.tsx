import { EventInput } from '@fullcalendar/core';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // css do toast
import api from '../../../services/api';
import { IProps } from '../../../types';

interface EventsData {
  id?: string;
  user_id?: string;
  title?: string;
  backgroundColor?: string;
  allDay?: boolean | number;
  start?: string;
  end?: Date | string | null;
  updated_at?: string;
  created_at?: string;
}

interface HooksCalendarData {
  createEvents(data: EventsData): void;
  dataEvents: EventInput[];
  setDataEvents(dataEvents: EventInput[]): void;
  listEvents(): void;
}

const CalendarContext = createContext<HooksCalendarData>({} as HooksCalendarData);

const CalendarContextProvider: React.FC<IProps> = ({ children }) => {
  const [dataEvents, setDataEvents] = useState<EventInput[]>([] as EventInput[]);

  const listEvents = useCallback(async () => {
    await api
      .get(`/events`)
      .then((response) => {
        console.log(response.data);
        setDataEvents(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [setDataEvents]);

  const createEvents = useCallback(async (data: EventsData) => {
    await api
      .post(`/events`, {
        user_id: '9C81-513CCD17-57B3-3C6F-FBCED16A59A1',
        title: data.title,
        start: data.start,
        end: data.end,
        backgroundColor: data.backgroundColor,
        allDay: data.allDay === undefined ? false : true
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Evento cadastrado com sucesso.');
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <CalendarContext.Provider
      value={{
        createEvents,
        dataEvents,
        setDataEvents,
        listEvents
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
