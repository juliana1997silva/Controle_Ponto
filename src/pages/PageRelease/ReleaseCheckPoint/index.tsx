import BlockIcon from '@rsuite/icons/Block';
import CheckIcon from '@rsuite/icons/Check';
import VisibleIcon from '@rsuite/icons/Visible';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, IconButton, Panel, SelectPicker, Table, Tag, Tooltip, Whisper } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useCheckPoint } from '../../CheckPoint/hooks/hookCheckPoint';
import DrawerView from '../components/DrawerView';
import { useReleasePoint } from '../hooks/hookReleasePoint';
import { ContainerButtonPDF, Divider30, TitlePage } from './styles';

const ReleaseCheckPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const { dataListUsers, listUsers, users, dataHourUsers, listHoursUsers, setOpenView, openView, releaseHours, generationPDF } =
    useReleasePoint();
  const { setDataRegisterStore } = useCheckPoint();

  const [select, setSelect] = useState('');
  const [buttonPDF, setButtonPDF] = useState(true);
  const [nameText, setNameText] = useState<string>({} as string);

  const dataSelect = Object.values(dataListUsers).map((item) => {
    return {
      role: item.name,
      value: item.id,
      label: item.name
    };
  });

  const handlePDF = useCallback(
    (id: string) => {
      if (id) generationPDF(id);
    },
    [generationPDF]
  );

  useEffect(() => {
    if (users === false) listUsers();
  }, [listUsers, users]);

  return (
    <>
      <Panel header={<TitlePage className="title">Liberar Ficha Semanal</TitlePage>}>
        <BreadcrumbComponent active="Liberar Ficha Semanal" href="/dashboard" label="Dashboard" />
        <SelectPicker
          data={dataSelect}
          searchable={false}
          placeholder="Selecione o Colaborador"
          onSelect={(v, e) => {
            setSelect(v);
            listHoursUsers(v);
            setNameText(String(e.label));
          }}
          onClean={() => {
            setSelect('');
            setButtonPDF(true);
          }}
          block
        />

        <Divider30 />
        {dataHourUsers && (
          <>
            <Table data={dataHourUsers} autoHeight>
              <Column width={150}>
                <HeaderCell>Data</HeaderCell>
                <Cell>{(rowData: any) => <span>{moment(rowData.date).format('DD/MM/YYYY')}</span>}</Cell>
              </Column>
              <Column width={110}>
                <HeaderCell>Entrada</HeaderCell>
                <Cell dataKey="entry_time" />
              </Column>
              <Column width={110}>
                <HeaderCell>Inicio Pausa</HeaderCell>
                <Cell dataKey="lunch_entry_time" />
              </Column>
              <Column width={110}>
                <HeaderCell>Termino Pausa</HeaderCell>
                <Cell dataKey="lunch_out_time" />
              </Column>
              <Column width={110}>
                <HeaderCell>Saída</HeaderCell>
                <Cell dataKey="out_time" />
              </Column>
              <Column width={110}>
                <HeaderCell>Status</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    switch (rowData.status) {
                      case 'approved':
                        return <Tag color="green">Aprovado</Tag>;
                      case 'disapproved':
                        return <Tag color="red">Reprovado</Tag>;
                      case 'pending':
                        return <Tag color="orange">Pendente</Tag>;
                    }
                  }}
                </Cell>
              </Column>
              <Column width={300} align="center">
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    if (rowData.status === 'approved') setButtonPDF(false);
                    switch (rowData.status) {
                      case 'approved':
                        return (
                          <ButtonGroup>
                            <Whisper
                              placement="top"
                              controlId="control-id-focus"
                              trigger="hover"
                              speaker={<Tooltip>Visualizar Detalhes</Tooltip>}
                            >
                              <IconButton
                                icon={<VisibleIcon />}
                                onClick={() => {
                                  setOpenView(true);
                                  setDataRegisterStore(rowData);
                                }}
                                style={{ color: '#000' }}
                              />
                            </Whisper>
                          </ButtonGroup>
                        );
                      case 'disapproved':
                        return (
                          <ButtonGroup>
                            <Whisper
                              placement="top"
                              controlId="control-id-focus"
                              trigger="hover"
                              speaker={<Tooltip>Visualizar Detalhes</Tooltip>}
                            >
                              <IconButton
                                icon={<VisibleIcon />}
                                onClick={() => {
                                  setOpenView(true);
                                  setDataRegisterStore(rowData);
                                }}
                                style={{ color: '#000' }}
                              />
                            </Whisper>
                          </ButtonGroup>
                        );
                      case 'pending':
                        return (
                          <ButtonGroup>
                            <>
                              <Whisper
                                placement="top"
                                controlId="control-id-focus"
                                trigger="hover"
                                speaker={<Tooltip>Visualizar Detalhes</Tooltip>}
                              >
                                <IconButton
                                  icon={<VisibleIcon />}
                                  onClick={() => {
                                    setOpenView(true);
                                    setDataRegisterStore(rowData);
                                  }}
                                  style={{ color: '#000' }}
                                />
                              </Whisper>
                              <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Aprovar</Tooltip>}>
                                <IconButton
                                  icon={<CheckIcon />}
                                  onClick={() => {
                                    //console.log(rowData.id);
                                    releaseHours(rowData.id, 'approved');
                                    setButtonPDF(false);
                                  }}
                                  style={{ color: '#000' }}
                                />
                              </Whisper>
                              <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Reprovar</Tooltip>}>
                                <IconButton
                                  icon={<BlockIcon />}
                                  onClick={() => {
                                    releaseHours(rowData.id, 'disapproved');
                                  }}
                                  style={{ color: '#000' }}
                                />
                              </Whisper>
                            </>
                          </ButtonGroup>
                        );
                    }
                  }}
                </Cell>
              </Column>
            </Table>
          </>
        )}
        <ContainerButtonPDF>
          <Button
            appearance="primary"
            style={{ backgroundColor: '#00a6a6', width: 150 }}
            onClick={() => handlePDF(select)}
            disabled={buttonPDF}
          >
            Gerar PDF
          </Button>
        </ContainerButtonPDF>
      </Panel>
      {openView && <DrawerView name={nameText} />}
    </>
  );
};
export default ReleaseCheckPoint;
