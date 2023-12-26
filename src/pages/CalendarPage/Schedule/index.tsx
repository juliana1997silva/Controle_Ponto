import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Button, Panel } from 'rsuite';
import { useCalendar } from '../hooks/hooksCalendar';
import EventModal from './components/EventModal';
import { TitlePage } from './styles';

export interface dataModal {
  title?: string;
  end?: string;
  start?: string;
  color?: string;
  allDay?: boolean;
}

const Schedule: React.FC = () => {
  const { listEvents, dataEvents, setMode, list, openModal, setOpenModal } = useCalendar();
  const [dateSelect] = useState<string>({} as string);
  const [dataModal, setDataModal] = useState<EventImpl>({} as EventImpl);

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      setDataModal(clickInfo.event);
      setOpenModal(true);
      setMode('edit');
    },
    [setDataModal, setOpenModal, setMode]
  );

  useLayoutEffect(() => {
    if (list === false) listEvents();
  });

  return (
    <Panel header={<TitlePage className="title">Agenda</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Button appearance="primary" color="green" onClick={() => setOpenModal(true)} style={{ width: 155 }}>
          Novo Evento
        </Button>
      </div>
      {list === true && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          weekends
          selectable
          selectMirror
          dayMaxEvents
          nextDayThreshold={'08:00:00'}
          initialEvents={dataEvents}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          locale={ptLocale}
        />
      )}
      <EventModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setMode('create');
        }}
        date={dateSelect}
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
