import React from 'react';
import { Chart } from 'react-google-charts';
import { Container, Divider, Title } from './styles';

const CardConsults: React.FC = () => {
  return (
    <Container>
      <Divider />
      <Title>Status das Consultas</Title>
      <Chart
        chartType="BarChart"
        width="100%"
        data={[
          [
            '',
            '',
            { role: 'style' },
            {
              sourceColumn: 0,
              role: 'annotation',
              type: 'string',
              calc: 'stringify'
            }
          ],
          ['Controle de Qualidade', 8, 'color: #5f58c6', null],
          ['Fechada', 26, 'color:#1976D2', null],
          ['Desenvolvimento', 12, 'color:#fbbc04', null],
          ['Não Iniciada', 7, 'color:#d9d9d9', null],
          ['Aguardando', 4, 'color:#ff6d01', null]
        ]}
        options={{
          legend: { position: 'none' },
          height: 400,
          width: 600
        }}
      />
    </Container>
  );
};

export default CardConsults;
