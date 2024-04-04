import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Panel, Table } from 'rsuite';
import { TitlePage } from '../GroupsList/styles';
import GroupsList from '../GroupsList';
import { GroupsData, useGroups } from '../hooks/hooksGroups';
import { PermissionsData, usePermissions } from '../../PagePermissions/hooks/hooksPermission';

interface dataMembros {
  data: PermissionsData;
}

const AcessPermissions: React.FC<dataMembros> = ({ data }) => {
  const { Column, HeaderCell, Cell } = Table;
  const [showGroups, setShowGroups] = useState(false);
  const { listPermissionsGroups, dataPermissions, connectPermission } = useGroups();

  const handleConnect = useCallback(
    (dataPermission: PermissionsData) => {
      if (data.id && dataPermission.id) connectPermission(data.id, dataPermission.id);
    },
    [connectPermission]
  );

  useEffect(() => {
    if (data.id) listPermissionsGroups(data.id);
  }, [listPermissionsGroups]);

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
        <Table data={dataPermissions} autoHeight>
          <Column width={300}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={300}>
            <HeaderCell>Descrição</HeaderCell>
            <Cell dataKey="description" />
          </Column>
          <Column width={210}>
            <HeaderCell>Status</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.status === 1 ? (
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
                    color={rowData.status === 1 ? 'red' : 'green'}
                    onClick={() => {
                      handleConnect(rowData);
                    }}
                  >
                    {rowData.status === 1 ? 'Desabilitar' : 'Habilitar'}
                  </Button>
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
