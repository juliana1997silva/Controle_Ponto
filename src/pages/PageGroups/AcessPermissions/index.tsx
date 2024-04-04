import React, { useState } from 'react';
import { Button, ButtonToolbar, Panel, Table } from 'rsuite';
import { TitlePage } from '../GroupsList/styles';
import GroupsList from '../GroupsList';
import { GroupsData } from '../hooks/hooksGroups';

interface dataMembros {
  data: GroupsData;
}

const AcessPermissions: React.FC<dataMembros> = ({data}) => {
  const { Column, HeaderCell, Cell } = Table;
  const [showGroups, setShowGroups] = useState(false);
  const dataTable = [
    {
      id: '1',
      name: 'Permissão 001',
      description: 'Descricao 001',
      active: 1
    },
    {
      id: '2',
      name: 'Permissão 002',
      description: 'Descricao 002',
      active: 0
    },
    {
      id: '3',
      name: 'Permissão 003',
      description: 'Descricao 003',
      active: 0
    },
    {
      id: '4',
      name: 'Permissão 004',
      description: 'Descricao 004',
      active: 1
    }
  ];

  if (showGroups) {
    return <GroupsList />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Permissões do Grupo - {data.name}</TitlePage>}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end'
          }}
        >
          <Button appearance="primary" onClick={() => setShowGroups(true)} style={{ width: 120 }} color="red">
            Voltar
          </Button>
        </div>
        <Table data={dataTable} autoHeight>
          <Column width={300}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={300}>
            <HeaderCell>Descrição</HeaderCell>
            <Cell dataKey="description" />
          </Column>
          <Column width={300}>
            <HeaderCell>Status</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.active === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={300}>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <ButtonToolbar>
                  <Button appearance="primary" color="blue">
                    Visualizar
                  </Button>
                  {rowData.active === 1 ? (
                    <Button appearance="primary" color="red">
                      Desativar
                    </Button>
                  ) : (
                    <Button appearance="primary" color="green">
                      Ativar
                    </Button>
                  )}
                </ButtonToolbar>
              )}
            </Cell>
          </Column>
        </Table>
      </Panel>
    </>
  );
};
export default AcessPermissions;
