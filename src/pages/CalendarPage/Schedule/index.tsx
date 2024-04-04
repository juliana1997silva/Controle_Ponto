import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Panel, Radio, SelectPicker } from 'rsuite';
import { useCalendar } from '../hooks/hooksCalendar';
import EventModal from './components/EventModal';
import { TitlePage } from './styles';
import { useAuth } from '../../../hooks/hooksAuth';
import { Select } from 'antd';
import { useReleasePoint } from '../../PageRelease/hooks/hookReleasePoint';

export interface dataModal {
  title?: string;
  end?: string;
  start?: string;
  color?: string;
  allDay?: boolean;
}

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const { listEvents, dataEvents, setMode, list, openModal, setOpenModal } = useCalendar();
  const { listUsers, dataListUsers } = useReleasePoint();
  const [dataModal, setDataModal] = useState<DateClickArg>({} as DateClickArg);

  const selectUsers = Object.values(dataListUsers).map((item) => {
    return {
      value: item?.id,
      label: item?.name,
      role: item?.name
    };
  });

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      //setDataModal(clickInfo.event);
      setOpenModal(true);
      setMode('edit');
    },
    [setOpenModal, setMode]
  );

  const handleEventAdd = useCallback(
    (clickInfo: DateClickArg) => {
      setDataModal(clickInfo);
      setOpenModal(true);
    },
    [setDataModal, setOpenModal]
  );

  useLayoutEffect(() => {
    if (!list) {
      listEvents();
      listUsers();
    }
  }, [list, listEvents, listUsers]);

  console.log('dataListUsers', dataListUsers);

  return (
    <Panel header={<TitlePage className="title">Agenda</TitlePage>}>
      {list && (
        <>
          {user.manager === 1 ? (
            <>
           {Object.values(dataListUsers).map((item) => {
            return (
              <Radio value={item.id}>{item.name}</Radio>
            )
           })}
            </>
            
          ) : (
            <>{user.admin === 1 && <SelectPicker data={selectUsers} onSelect={(e) => console.log(e)} />}</>
          )}

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView="dayGridMonth"
            dayMaxEvents
            nextDayThreshold={'08:00:00'}
            initialEvents={dataEvents}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            dateClick={handleEventAdd}
            locale={ptLocale}
          />
        </>
      )}
      <EventModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setMode('create');
        }}
        rowData={dataModal}
      />
    </Panel>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  const { timeText, event } = eventContent;
  return (
    <>
      {timeText && (
        <>
          <div className="fc-daygrid-event-dot"></div>
          <div className="fc-event-time">{eventContent.timeText}</div>
        </>
      )}
      <div className="fc-event-title">{event.title}</div>
    </>
  );
}

export default Schedule;
