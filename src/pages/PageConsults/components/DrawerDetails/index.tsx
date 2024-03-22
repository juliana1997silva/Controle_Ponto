import FileDownloadIcon from '@rsuite/icons/FileDownload';
import VisibleIcon from '@rsuite/icons/Visible';
import { Input, Timeline } from 'antd';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Button, ButtonGroup, Drawer, IconButton, Panel, Table, Tooltip, Whisper } from 'rsuite';
import Loading from '../../../../components/Loading';
import { useConsults } from '../../hooks/hooksConsults';
import DrawerCVSDetails from '../DrawerCVSDetails';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
  request_key: string;
}

const DrawerDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel, request_key }) => {
  const { Column, HeaderCell, Cell } = Table;
  const { TextArea } = Input;
  const { dataDetails } = useConsults();
  const [showDetailsCvs, setShowDetailsCvs] = useState(false);

  const statusDescription = dataDetails.status_description || '';
  let datas;
  if (statusDescription.includes('..')) {
    datas = statusDescription.split('..');
  } else if (statusDescription.includes('<br>')) {
    datas = statusDescription.split('<br>');
  } else {
    datas = [statusDescription];
  }

  const textoComQuebras = datas.map((data, index) => data.trim()).join('\n');

  const items =
    dataDetails.event && dataDetails.event.status && dataDetails.event.status.history
      ? Object.values(dataDetails.event.status.history).map((item) => ({
          children: (
            <>
              <p>
                {moment(item.datetime).format('DD/MM/YYYY HH:mm:ss')} - <b>{item.user}</b>{' '}
              </p>
              <p>{item.message}</p>
            </>
          )
        }))
      : [];

  const handleView = useCallback((data: any) => {
    console.log('data:', data);
    setShowDetailsCvs(true);
  }, []);

  return (
    <>
      <Drawer open={open} onClose={onClose} size="calc(100% - 120px)">
        <Drawer.Header>
          <Drawer.Title>
            {request_key} - {dataDetails.description}
          </Drawer.Title>
          <Drawer.Actions>
            <Button onClick={onClickCancel} color="red" appearance="primary">
              Fechar
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        {dataDetails.description ? (
          <Drawer.Body>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '55%' }}>
              <div style={{ marginRight: 15 }}>
                <span>Inicio Previsto</span>
                <Input
                  value={dataDetails.planned_begin_time && moment(dataDetails.planned_begin_time).format('DD/MM/YYYY - HH:mm:ss')}
                  disabled
                />
                <span>Fim Previsto</span>
                <Input
                  value={dataDetails.planned_end_time && moment(dataDetails.planned_end_time).format('DD/MM/YYYY - HH:mm:ss')}
                  disabled
                />
              </div>
              <div>
                <span>Inicio Real</span>
                <Input value={dataDetails.begin_time && moment(dataDetails.begin_time).format('DD/MM/YYYY - HH:mm:ss')} disabled />
                <span>Fim Real</span>
                <Input value={dataDetails.end_time && moment(dataDetails.end_time).format('DD/MM/YYYY - HH:mm:ss')} disabled />
              </div>
            </div>
            <div style={{ padding: 5 }} />
            <h5>Detalhamento da Situação</h5>
            <div style={{ padding: 5 }} />
            <TextArea readOnly={true} autoSize={{ minRows: 10, maxRows: 10 }} value={textoComQuebras} disabled />
            <div style={{ padding: 5 }} />
            <Panel header="Historico Situação" collapsible bordered>
              <Timeline items={items} />
            </Panel>
            <Panel header="Documentos Anexados" collapsible bordered>
              <Table data={dataDetails.attachment} autoHeight>
                <Column width={550}>
                  <HeaderCell>Nome Documento</HeaderCell>
                  <Cell dataKey="name" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Descrição</HeaderCell>
                  <Cell dataKey="description" />
                </Column>
                <Column width={180}>
                  <HeaderCell>Data</HeaderCell>
                  <Cell>{(rowData: any) => <span>{moment(rowData.insertion).format('DD/MM/YYYY - HH:mm:ss')}</span>}</Cell>
                </Column>
                <Column width={100}>
                  <HeaderCell>Usuario</HeaderCell>
                  <Cell dataKey="user" />
                </Column>
                <Column width={90}>
                  <HeaderCell>Download</HeaderCell>
                  <Cell>{(rowData: any) => <IconButton icon={<FileDownloadIcon />} />}</Cell>
                </Column>
              </Table>
            </Panel>
            <Panel header="Commits" collapsible bordered>
              <Table data={dataDetails.cvs && dataDetails.cvs.program ? dataDetails.cvs.program : []} autoHeight>
                <Column width={150}>
                  <HeaderCell>Versão</HeaderCell>
                  <Cell dataKey="version" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Arquivo</HeaderCell>
                  <Cell dataKey="file" />
                </Column>
                <Column width={300}>
                  <HeaderCell>Usuario</HeaderCell>
                  <Cell dataKey="user" />
                </Column>
                <Column>
                  <HeaderCell>Ações</HeaderCell>
                  <Cell>
                    {(rowData: any) => (
                      <ButtonGroup>
                        <Whisper
                          placement="top"
                          controlId="control-id-focus"
                          trigger="hover"
                          speaker={<Tooltip>Visualizar Detalhes</Tooltip>}
                        >
                          <IconButton icon={<VisibleIcon />} onClick={() => handleView(rowData)} style={{ color: '#000' }} />
                        </Whisper>
                      </ButtonGroup>
                    )}
                  </Cell>
                </Column>
              </Table>
            </Panel>
          </Drawer.Body>
        ) : (
          <Loading />
        )}
      </Drawer>
      {showDetailsCvs && (
        <DrawerCVSDetails
          open={showDetailsCvs}
          onClose={() => setShowDetailsCvs(false)}
          onClickCancel={() => {
            setShowDetailsCvs(false);
            //setDataDetails({} as dataConsultsDetails);
          }}
        />
      )}
    </>
  );
};
export default DrawerDetails;
