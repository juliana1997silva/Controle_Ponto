import CheckIcon from '@rsuite/icons/Check';
import EditIcon from '@rsuite/icons/Edit';
import HistoryIcon from '@rsuite/icons/History';
import MessageIcon from '@rsuite/icons/Message';
import PageIcon from '@rsuite/icons/Page';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import nextId from 'react-id-generator';
import { ButtonGroup, IconButton, Panel, Table, Tooltip, Whisper } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useAuth } from '../../../hooks/hooksAuth';
import Consult from '../components/Consult';
import HourCommercial from '../components/HourCommercial';
import { dataForm, useCheckPoint } from '../hooks/hookCheckPoint';
import { TitlePage } from './styles';

const { Column, HeaderCell, Cell, ColumnGroup } = Table;

const Point: React.FC = () => {
  const { setDataModal, setOpenModal, setOpenCommercial, openCommercial, openModal } = useCheckPoint();
  const mes = new Date().getMonth();
  const ano = new Date().getFullYear();
  const { user } = useAuth();
  const value = moment().locale('pt-br').month(mes).year(ano);

  const calendar = new Array();
  const [data, setData] = useState<dataForm[]>([]);

  moment.updateLocale('pt', {
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  });

  const EditableCell = ({ rowData, dataKey, onChange, ...props }: any) => {
    const editing = rowData.status === 'EDIT';
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            onChange={(event) => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

  const EditableCellLocation = ({ rowData, dataKey, onChange, ...props }: any) => {
    const editing = rowData.status === 'EDIT';
    //let value = "";
    //if (dataKey) if (rowData[dataKey]) value = rowData[dataKey];
    return (
      <Cell {...props} className={editing ? 'table-content-editing' : ''}>
        {editing ? (
          <input
            className="rs-input"
            defaultValue={rowData[dataKey]}
            //value={rowData[dataKey] ? rowData[dataKey] : value}
            onChange={(event) => {
              onChange && onChange(rowData.id, dataKey, event.target.value);
            }}
          />
        ) : (
          <span className="table-content-edit-span">{rowData[dataKey]}</span>
        )}
      </Cell>
    );
  };

  const handleChange = (id: any, key: any, value: any) => {
    const nextData: any = Object.assign([], data);
    nextData.find((item: any) => item.id === id)[key] = value;
    setData(nextData);
  };
  const handleEditState = (id: string) => {
    const nextData = Object.assign([], data);
    const activeItem: any = nextData.find((item: any) => item.id === id);
    activeItem.status = activeItem.status ? null : 'EDIT';
    setData(nextData);
  };

  const weekDayName = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

  useEffect(() => {
    //const startDay = value.clone().startOf("month");
    // const endDay = value.clone().endOf("month");
    const startDay = value.clone().startOf('week');
    const endDay = value.clone().endOf('week');
    //console.log(endDay);
    const day = startDay.clone().subtract(1, 'day');
    while (day.isBefore(endDay, 'day')) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, 'day').clone())
      );
    }

    /* while (day.isBefore(endDay, "day")) {
      if (value.format("MMMM") === "Fevereiro") {
        calendar.push(
          Array(28)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      } else if (
        value.format("MMMM") === "Janeiro" ||
        value.format("MMMM") === "Março" ||
        value.format("MMMM") === "Maio" ||
        value.format("MMMM") === "Julho" ||
        value.format("MMMM") === "Agosto" ||
        value.format("MMMM") === "Outubro" ||
        value.format("MMMM") === "Dezembro"
      ) {
        calendar.push(
          Array(31)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      } else {
        calendar.push(
          Array(30)
            .fill(0)
            .map(() => day.add(1, "day").clone())
        );
      }
    } */

    const date = calendar.map((month: any) => {
      return month.map((day: any, index: any) => {
        return {
          id: nextId('date-'),
          date: moment(day._d).format('DD/MMMM/YYYY'),
          entry_time:
            weekDayName[day._d.getDay()] === 'domingo' || weekDayName[day._d.getDay()] === 'sábado' ? '' : user.user?.parameter?.entry_time,
          location: weekDayName[day._d.getDay()] === 'domingo' || weekDayName[day._d.getDay()] === 'sábado' ? 'Descanso' : 'Home_Office',
          lunch_entry_time:
            weekDayName[day._d.getDay()] === 'domingo' || weekDayName[day._d.getDay()] === 'sábado'
              ? ''
              : user.user?.parameter?.lunch_entry_time,
          lunch_out_time:
            weekDayName[day._d.getDay()] === 'domingo' || weekDayName[day._d.getDay()] === 'sábado'
              ? ''
              : user.user?.parameter?.lunch_out_time,
          out_time:
            weekDayName[day._d.getDay()] === 'domingo' || weekDayName[day._d.getDay()] === 'sábado' ? '' : user.user?.parameter?.out_time,
          status: null,
          activities: [
            { consult: '2611', description: 'Teste 001' },
            { consult: '1408', description: 'Teste 002' },
            { consult: '1502', description: 'Teste 003' }
          ]
        };
      });
    });
    setData(date[0]);
    //console.log(date);
  }, []);

  return (
    <>
      <Panel header={<TitlePage className="title">Registro de Ponto</TitlePage>}>
        <BreadcrumbComponent active="Registro de Ponto" href="/dashboard" label="Dashboard" />

        <Table autoHeight data={data} cellBordered height={420} headerHeight={80} bordered>
          <Column width={150} align="center">
            <HeaderCell>Data</HeaderCell>
            <Cell dataKey="date" />
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Local</HeaderCell>
            <EditableCellLocation dataKey="location" onChange={handleChange} />
          </Column>
          <ColumnGroup header="Horário Comercial" align="center">
            <Column width={110} colSpan={4}>
              <HeaderCell>Entrada</HeaderCell>
              <EditableCell dataKey="entry_time" onChange={handleChange} />
            </Column>
            <Column width={110}>
              <HeaderCell>Inicio Pausa</HeaderCell>
              <EditableCell dataKey="lunch_entry_time" onChange={handleChange} />
            </Column>
            <Column width={110}>
              <HeaderCell>Termino Pausa</HeaderCell>
              <EditableCell dataKey="lunch_out_time" onChange={handleChange} />
            </Column>
            <Column width={110}>
              <HeaderCell>Saída</HeaderCell>
              <EditableCell dataKey="out_time" onChange={handleChange} />
            </Column>
          </ColumnGroup>

          <Column width={300} align="center">
            <HeaderCell>Ações</HeaderCell>
            <Cell>
              {(rowData: any) => {
                //console.log(rowData.status);
                return (
                  <ButtonGroup>
                    {rowData.status === 'EDIT' ? (
                      <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Salvar Alteração</Tooltip>}>
                        <IconButton icon={<CheckIcon />} onClick={() => handleEditState(rowData.id)} appearance="primary" color="green" />
                      </Whisper>
                    ) : (
                      <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                        <IconButton
                          icon={<EditIcon />}
                          onClick={() => {
                            handleEditState(rowData.id);
                            console.log(rowData.id);
                          }}
                          appearance="primary"
                          style={{ backgroundColor: '#00a6a6' }}
                        />
                      </Whisper>
                    )}

                    <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Adicionar Consultas</Tooltip>}>
                      <IconButton
                        icon={<PageIcon />}
                        onClick={() => {
                          setOpenModal(true);
                          console.log(rowData);
                          setDataModal(rowData);
                        }}
                        appearance="primary"
                        color="blue"
                      />
                    </Whisper>

                    <Whisper
                      placement="top"
                      controlId="control-id-focus"
                      trigger="hover"
                      speaker={<Tooltip>Adicionar Horário Não Comercial</Tooltip>}
                    >
                      <IconButton
                        icon={<HistoryIcon />}
                        onClick={() => {
                          setOpenCommercial(true);
                          console.log(rowData);
                          setDataModal(rowData);
                        }}
                        appearance="primary"
                        color="yellow"
                      />
                    </Whisper>
                    <Whisper placement="top" controlId="control-id-focus" trigger="hover" speaker={<Tooltip>Adicionar Observação</Tooltip>}>
                      <IconButton
                        icon={<MessageIcon />}
                        onClick={() => {
                          setOpenCommercial(true);
                          console.log(rowData);
                          setDataModal(rowData);
                        }}
                        appearance="primary"
                        color="cyan"
                      />
                    </Whisper>

                    {/* <Button
                      appearance="link"
                      onClick={() => handleEditState(rowData.id)}
                    >
                      {rowData?.status === "EDIT" ? "Save" : "Edit"}
                    </Button>
                    <Button
                      appearance="link"
                      onClick={() => {
                        setOpenModal(true);
                        console.log(rowData);
                        setDataModal(rowData);
                      }}
                    >
                      Consultas
                    </Button>
                    <Button
                      appearance="link"
                      onClick={() => {
                        setOpenCommercial(true);
                        console.log(rowData);
                        setDataModal(rowData);
                      }}
                    >
                      Não Comercial
                    </Button> */}
                  </ButtonGroup>
                );
              }}
            </Cell>
          </Column>
        </Table>
      </Panel>
      {openModal && (
        <>
          <Consult />
        </>
      )}

      {openCommercial && (
        <>
          <HourCommercial />
        </>
      )}
    </>
  );
};

export default Point;
