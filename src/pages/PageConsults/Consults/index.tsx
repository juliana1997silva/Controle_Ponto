import VisibleIcon from '@rsuite/icons/Visible';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, IconButton, Panel, Table, Tooltip, Whisper } from 'rsuite';
import ConsultsCreated from '../ConsultsCreated';
import DrawerDetails from '../components/DrawerDetails';
import { TitlePage } from './styles';
import api from '../../../services/api';

const Consults: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [showCreated, setShowCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dataConsults, setDataConsults] = useState<[]>([]);

  const consultsGet = useCallback(async () => {
    const data = await api.get('consults');

    console.log('data::consults:',data.data);
    setDataConsults(data.data);
    setShowCreated(false)

  },[]);

  useEffect(() => {
    consultsGet()
  },[])

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
        <Table data={dataConsults} autoHeight>
          <Column>
            <HeaderCell>Consulta</HeaderCell>
            <Cell>
              {(rowData: any) => (
                <>
                  <a href={rowData.link} target="_blank" rel="noopener noreferrer">
                    {rowData.request_key}
                  </a>
                </>
              )}
            </Cell>
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
