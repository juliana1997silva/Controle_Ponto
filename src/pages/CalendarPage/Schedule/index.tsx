import React, { useState } from 'react';
import {  Panel } from 'rsuite';
import { TitlePage } from './styles';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './components/EventModal';
import { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import ptLocale from '@fullcalendar/core/locales/pt-br';

const Schedule: React.FC = () => {

  const [editable, setEditable] = useState(false);
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log('selectInfo  =>' , selectInfo);
    setEditable(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log('clickInfo =>' ,clickInfo);
    setEditable(true);
  };

      
  return (
    <Panel header={<TitlePage className="title">Agenda</TitlePage>}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        weekends
        editable
        selectable
        selectMirror
        dayMaxEvents
        nextDayThreshold={'08:00:00'}
        //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect}
        eventContent={renderEventContent} // custom render function
        eventClick={handleEventClick}
        locale={ptLocale}
      />
      <EventModal
        open={editable}
        onClose={() => setEditable(false)}
        onAddEvent={() => {
          setEditable(false);
        }}
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
