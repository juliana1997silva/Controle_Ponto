import { EventClickArg, EventContentArg } from '@fullcalendar/core';
import { EventImpl } from '@fullcalendar/core/internal';
import ptLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import React, { useCallback, useEffect, useState } from 'react';
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
  const { listEvents, dataEvents } = useCalendar();
  const [dateSelect] = useState<string>({} as string);
  const [editable, setEditable] = useState(false);
  const [dataModal, setDataModal] = useState<EventImpl>({} as EventImpl);

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      console.log('clickInfo =>', clickInfo.event);
      setDataModal(clickInfo.event);
      setEditable(true);
    },
    [setDataModal, setEditable]
  );

  useEffect(() => {
    if (dataEvents.length === 0) listEvents();
  }, [dataEvents, listEvents]);

  console.log(dataEvents);

  return (
    <Panel header={<TitlePage className="title">Agenda</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Button appearance="primary" color="green" onClick={() => setEditable(true)} style={{ width: 155 }}>
          Novo Evento
        </Button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        weekends
        //editable
        selectable
        selectMirror
        dayMaxEvents
        nextDayThreshold={'08:00:00'}
        initialEvents={dataEvents} // alternatively, use the `events` setting to fetch from a feed
        //select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        locale={ptLocale}
      />
      <EventModal open={editable} onClose={() => setEditable(false)} date={dateSelect} rowData={dataModal} />
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
