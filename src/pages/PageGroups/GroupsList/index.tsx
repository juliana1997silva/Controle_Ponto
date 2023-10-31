import React from 'react';
import { Button, Panel, Table } from 'rsuite';
import { ContainerButton, TitlePage } from './styles';
import BreadcrumbComponent from '../../../components/Breadcrumb';

const GroupsList: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;

  const data = [
    {
      id: 'JKHBDUVDHGJB16532654',
      name: 'Grupo 01',
      level: '1',
      status: 1
    },
    {
      id: 'JKHBDUVDHGJJKBDASY514869465B16532654',
      name: 'Grupo 02',
      level: '3',
      status: 0
    }
  ];
  return (
    <>
     <Panel header={<TitlePage className="title">Grupos</TitlePage>}>
        <BreadcrumbComponent active="Grupos" href="/dashboard" label="Dashboard" />
      <ContainerButton>
        <Button appearance="primary" type="submit" style={{ backgroundColor: '#00a6a6', width: 120 }}>
          Novo
        </Button>
      </ContainerButton>
      <Table data={data} >
        <Column>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column>
          <HeaderCell>Nível</HeaderCell>
          <Cell dataKey="level" />
        </Column>
        <Column>
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData: any) => {
              return (
                <>
                  {rowData.status === 1 ? (
                    <>
                      {/* <div style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'green'}} /> */}
                      <span>Ativo</span>
                    </>
                  ) : (
                    <>
                      {/* <div style={{ height: 10, width: 10, borderRadius: 5, backgroundColor: 'red', marginRight: 10 }} /> */}
                      <span>Inativo</span>
                    </>
                  )}
                </>
              );
            }}
          </Cell>
        </Column>
      </Table>
      </Panel>
    </>
  );
};

export default GroupsList;
