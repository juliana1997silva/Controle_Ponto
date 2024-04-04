import React, { useEffect, useState } from 'react';
import { Button, ButtonToolbar, Panel, Table } from 'rsuite';
import { Image, TitlePage } from '../styles';
import PermissionsCreated from '../PermissionsCreated';
import CreativeIcon from '@rsuite/icons/Creative';
import { usePermissions } from '../hooks/hooksPermission';

const PermissionsList: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [showCreated, setShowCreated] = useState(false);
  const { listPermissions, list, dataPermissions , setMode, setDataPermissionsStore, deletePermission} = usePermissions();

  useEffect(() => {
    if (!list) listPermissions();
  }, [list, listPermissions]);

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
      <Table data={dataPermissions} autoHeight>
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
        <Column width={100} align="center">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData: any) => (
              <>
                {rowData.status === '1' ? (
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
                <Button
                  appearance="primary"
                  color="orange"
                  onClick={() => {
                    setMode('edit');
                    setDataPermissionsStore(rowData);
                    setShowCreated(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  appearance="primary"
                  color="red"
                  onClick={() => {
                    deletePermission(rowData.id);
                  }}
                >
                  Excluir
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
