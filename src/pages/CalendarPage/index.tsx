import React from 'react';
import Schedule from './Schedule';
import AppProvider from './hooks';

const CalendarPage: React.FC = () => {
  return (
    <AppProvider>
      <Schedule />
    </AppProvider>
  );
};

export default CalendarPage;
