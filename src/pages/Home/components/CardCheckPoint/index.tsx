import React from 'react';
import { Table } from 'rsuite';
import { useHome } from '../../hooks/hooksHome';
import { Circle, Container, ContainerStatus, Divider, DividerFichas, Status, Title } from './styles';

const CardCheckPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const { dataDashboard } = useHome();

  return (
    <Container>
      <Divider />
      <Title>Últimas Fichas</Title>
      <DividerFichas />
      <Table data={dataDashboard.cheats} autoHeight>
        <Column width={270} align="left">
          <HeaderCell>Data</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={270} align="left">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData: any) => {
              switch (rowData.status) {
                case 'Aprovada':
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: 'green'
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );

                case 'Reprovada':
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: 'red'
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );

                default:
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: 'yellow'
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );
              }
            }}
          </Cell>
        </Column>
      </Table>
    </Container>
  );
};

export default CardCheckPoint;
