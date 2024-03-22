import React, { useState } from 'react';
import { Button, ButtonToolbar, Panel, Table } from 'rsuite';
import { Image, TitlePage } from '../styles';
import PermissionsCreated from '../PermissionsCreated';
import CreativeIcon from '@rsuite/icons/Creative';

const PermissionsList: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [showCreated, setShowCreated] = useState(false);
  const data = [
    {
      id: '1',
      name: 'Permissão 001',
      description: 'Descricao 001',
      image: null
    },
    {
      id: '2',
      name: 'Permissão 002',
      description: 'Descricao 002',
      image: null
    },
    {
      id: '3',
      name: 'Permissão 003',
      description: 'Descricao 003',
      image: null
    },
    {
      id: '4',
      name: 'Permissão 004',
      description: 'Descricao 004',
      image: null
    }
  ];

  if (showCreated) {
    return <PermissionsCreated />;
  }
  return (
    <Panel header={<TitlePage className="title">Permissões</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Button appearance="primary" onClick={() => setShowCreated(true)} style={{ backgroundColor: '#1976D2', width: 120 }}>
          Novo
        </Button>
      </div>
      <Table data={data} autoHeight>
        <Column width={90}>
          <HeaderCell>Imagem</HeaderCell>
          <Cell dataKey="image">
            {(rowData: any, rowIndex: any) => {
              return rowData.image === null ? (
                <CreativeIcon />
              ) : (
                <Image /* src={`${process && process.env.REACT_APP_URL_API}${routesEndpoints.SEARCH_IMAGE}${rowData.image}`} */ />
              );
            }}
          </Cell>
        </Column>
        <Column width={300}>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>
        <Column width={300}>
          <HeaderCell>Descrição</HeaderCell>
          <Cell dataKey="description" />
        </Column>
        <Column width={300}>
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <ButtonToolbar>
                <Button appearance="primary" color="blue">
                  Visualizar
                </Button>
              </ButtonToolbar>
            )}
          </Cell>
        </Column>
      </Table>
    </Panel>
  );
};

export default PermissionsList;
