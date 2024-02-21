import React from 'react';
import { Breadcrumb, Panel, Table } from 'rsuite';
import { TitlePage } from './styles';

const Report: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const data = [
    {
      name: 'Juliana Silva',
      coordenador: 'Wilson Felix',
      activities: [
        {
          consulta: '58642',
          description: 'Teste 0001'
        },
        {
          consulta: '58642',
          description: 'Teste 0001'
        },
        ,
        {
          consulta: '58642',
          description: 'Teste 0001'
        },
        ,
        {
          consulta: '58642',
          description: 'Teste 0001'
        }
      ]
    }
  ];
  return (
    <>
      <Panel header={<TitlePage className="title">Relatório</TitlePage>}>
        <Breadcrumb>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Relatório</Breadcrumb.Item>
        </Breadcrumb>
        <Table data={data}>
          <Column>
            <HeaderCell>Nome:</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column>
            <HeaderCell>Coordenador:</HeaderCell>
            <Cell dataKey="coordenador" />
          </Column>
          <Column>
            <HeaderCell>Qtda. Consulta Atendida:</HeaderCell>
            <Cell>
              {(rowData: any) => {
                // //console.log(rowData.activities);
                return <span>{[rowData.activities].length}</span>;
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </>
  );
};

export default Report;
