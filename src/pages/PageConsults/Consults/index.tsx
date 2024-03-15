import VisibleIcon from '@rsuite/icons/Visible';
import React, { useState } from 'react';
import { Button, ButtonGroup, IconButton, Panel, Table, Tooltip, Whisper } from 'rsuite';
import ConsultsCreated from '../ConsultsCreated';
import DrawerDetails from '../components/DrawerDetails';
import { TitlePage } from './styles';

const Consults: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [showCreated, setShowCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const data = [
    {
      request_key: '59396',
      user: 'wfelix',
      situation: 'Desenvolvimento',
      documentation: 1,
      revision: 1,
      bug: 1,
      daily: 1,
      update: 1,
      service_forecast: 1,
      commit: 0
    },

    {
      request_key: '59396',
      user: 'wfelix',
      situation: 'Desenvolvimento',
      documentation: 0,
      revision: 1,
      bug: 1,
      daily: 1,
      update: 1,
      service_forecast: 1,
      commit: 1
    }
  ];

  if (showCreated) {
    return <ConsultsCreated />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Consultas</TitlePage>}>
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
        <Table data={data}>
          <Column>
            <HeaderCell>Consulta</HeaderCell>
            <Cell dataKey="request_key" />
          </Column>
          <Column>
            <HeaderCell>Usuário</HeaderCell>
            <Cell dataKey="user" />
          </Column>
          <Column width={130}>
            <HeaderCell>Status</HeaderCell>
            <Cell dataKey="situation" />
          </Column>
          <Column width={130} align="center">
            <HeaderCell>Documentação</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.documentation === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>Revisão</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.revision === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>BUG</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.bug === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>Diário</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.daily === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column align="center">
            <HeaderCell>Atualização</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.update === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column width={160} align="center">
            <HeaderCell>Previsão de Atendimento</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.service_forecast === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column>
            <HeaderCell>Commit</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  {rowData.commit === 1 ? (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
                  ) : (
                    <div style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
                  )}
                </>
              )}
            </Cell>
          </Column>
          <Column>
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              <ButtonGroup>
                <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Visualizar Detalhes</Tooltip>}>
                  <IconButton icon={<VisibleIcon />} onClick={() => setShowDetails(true)} style={{ color: '#000' }} />
                </Whisper>
              </ButtonGroup>
            </Cell>
          </Column>
        </Table>
      </Panel>
      {showDetails && (
        <DrawerDetails
          open={showDetails}
          onClose={() => setShowDetails(false)}
          onClickCancel={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default Consults;
