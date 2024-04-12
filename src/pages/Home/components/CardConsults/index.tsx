import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useAuth } from '../../../../hooks/hooksAuth';
import { Container, Divider, Title } from './styles';

const CardConsults: React.FC = () => {
  const { dataDashboard, consultationsData } = useAuth();

  return (
    <Container>
      <Divider />
      <Title>Status das Consultas</Title>
      {dataDashboard.consultations && (
        <Chart
          chartType="BarChart"
          width="100%"
          data={consultationsData}
          options={{
            legend: { position: 'none' },
            height: 400,
            width: 600
          }}
        />
      )}
    </Container>
  );
};

export default CardConsults;
