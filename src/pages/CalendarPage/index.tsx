import AddOutlineIcon from "@rsuite/icons/AddOutline";
import CloseIcon from "@rsuite/icons/Close";
import PlusIcon from "@rsuite/icons/Plus";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import {
  Badge,
  ButtonToolbar,
  Calendar,
  CustomProvider,
  Drawer,
  Form,
  IconButton,
  Table,
} from "rsuite";
import ptBR from "rsuite/locales/pt_BR";
import { useAuth } from "../../hooks/hooksAuth";
import {
  dataConsult,
  dataHourCommercial,
} from "../CheckPoint/hooks/hookCheckPoint";

const CalendarPage: React.FC = () => {
  const { Column, HeaderCell, Cell, ColumnGroup } = Table;
  const [modal, setModal] = useState(false);
  const [commercial, setCommercial] = useState(false);
  const { user } = useAuth();
  const [dataCommercial, setDataCommercial] = useState<dataHourCommercial>(
    {} as dataHourCommercial
  );
  const [consultData, setConsultData] = useState<dataConsult>(
    {} as dataConsult
  );
  const [tableCommercial] = useState<dataHourCommercial[]>([]);
  const [tableConsult] = useState<dataConsult[]>([]);
  const [openConsult, setOpenConsult] = useState(false);

  function renderCell(date: Date) {
    const day = date.getDate();
    switch (day) {
      case 10:
        return <Badge color="yellow" />;
      case 15:
        return <Badge color="cyan" />;
    }
    if (tableConsult.length && tableCommercial.length) {
      return (
        <>
          <Badge color="violet" /> <Badge color="cyan" />
        </>
      );
    } else if (tableCommercial.length) {
      return <Badge color="violet" />;
    } else if (tableConsult.length) {
      return <Badge color="cyan" />;
    } else {
      return null;
    }
  }

  const handleSelectDay = useCallback(
    (date: Date) => {
      setModal(true);
      console.log(date);
    },
    [setModal]
  );

  const handleChangeNoCommercial = useCallback(
    (form: dataHourCommercial) => {
      console.log(form);
      setDataCommercial(form);
    },
    [setDataCommercial]
  );

  const handleChangeConsult = useCallback(
    (form: dataConsult) => {
      console.log(form);
      setConsultData(form);
    },
    [setConsultData]
  );

  /* const handleSubmit = useCallback(() => {
    console.log(dataCommercial.entry_time_nocommercial);
    console.log(dataCommercial.out_time_nocommercial);
    if (
      dataCommercial.entry_time_nocommercial !== undefined &&
      dataCommercial.out_time_nocommercial !== undefined
    ) {
      tableCommercial.push({
        entry_time_nocommercial: dataCommercial.entry_time_nocommercial,
        lunch_entry_time_nocommercial: dataCommercial.lunch_entry_time_nocommercial,
        lunch_out_time_nocommercial: dataCommercial.lunch_out_time_nocommercial,
        out_time_nocommercial: dataCommercial.out_time_nocommercial,
      });
      setDataCommercial({
        entry_time_nocommercial: "",
        lunch_entry_time_nocommercial: "",
        lunch_out_time_nocommercial: "",
        out_time_nocommercial: "",
      });
    } else {
      toast.error("Preencha os campos obrigatorios");
    }
    setDataCommercial({
      entry_time_commercial: "",
      lunch_entry_time_commercial: "",
      lunch_out_time_commercial: "",
      out_time_commercial: "",
    });
  }, [dataCommercial, tableCommercial, setDataCommercial]);

  const handleSubmitConsult = useCallback(() => {
    if (
      consultData.consult !== undefined &&
      consultData.description !== undefined
    ) {
      console.log("dentro if");
      tableConsult.push({
        consult: consultData.consult,
        description: consultData.description,
      });
      setConsultData({
        consult: "",
        description: "",
      });
    } else {
      toast.error("Preencha os campos obrigatorios");
    }
  }, [consultData, tableConsult, setConsultData]); */

  return (
    <>
      <CustomProvider locale={ptBR}>
        <Calendar
          bordered
          locale={{
            formattedMonthPattern: "MMMM",
          }}
          onSelect={(e) => handleSelectDay(e)}
          renderCell={renderCell}
        />
      </CustomProvider>
      <Drawer
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Registro de Ponto</Drawer.Title>
          <Drawer.Actions>
            <ButtonToolbar>
              <IconButton
                icon={<AddOutlineIcon />}
                onClick={() => setCommercial(!commercial)}
              >
                Não Comercial
              </IconButton>

              <IconButton
                icon={<PlusIcon />}
                onClick={() => setOpenConsult(!openConsult)}
              >
                Consultas
              </IconButton>
            </ButtonToolbar>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <h5>Expediente</h5>
          <Form formDefaultValue={user.user.parameter} layout="inline">
            <Form.Group>
              <Form.ControlLabel>Local</Form.ControlLabel>
              <br />
              <Form.Control name="location" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Entrada</Form.ControlLabel>
              <br />
              <Form.Control name="entry_time" type="time" />
            </Form.Group>
            <Form.Group>
              <Form.Group>
                <Form.ControlLabel>Inicio Pausa</Form.ControlLabel>
                <br />
                <Form.Control
                  name="lunch_entry_time"
                  type="time"
                  style={{ width: 140 }}
                />
              </Form.Group>
              <Form.Group style={{ marginLeft: 20 }}>
                <Form.ControlLabel>Termino Pausa</Form.ControlLabel>
                <br />
                <Form.Control
                  name="lunch_out_time"
                  type="time"
                  style={{ width: 140 }}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Saída</Form.ControlLabel>
              <br />
              <Form.Control name="out_time" type="time" />
            </Form.Group>
          </Form>
          <div style={{ padding: 20 }} />
          {commercial && (
            <>
              <h5>Horário Não Comercial</h5>
              <Form layout="inline" onChange={handleChangeNoCommercial}>
                <Form.Group>
                  <Form.ControlLabel>Entrada</Form.ControlLabel>
                  <br />
                  <Form.Control name="entry_time_commercial" type="time" />
                </Form.Group>
                <Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Inicio Pausa</Form.ControlLabel>
                    <br />
                    <Form.Control
                      name="lunch_entry_time_commercial"
                      type="time"
                      style={{ width: 140 }}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginLeft: 20 }}>
                    <Form.ControlLabel>Termino Pausa</Form.ControlLabel>
                    <br />
                    <Form.Control
                      name="lunch_out_time_commercial"
                      type="time"
                      style={{ width: 140 }}
                    />
                  </Form.Group>
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Saída</Form.ControlLabel>
                  <br />
                  <Form.Control name="out_time_commercial" type="time" />
                </Form.Group>
                <br />
                <Form.Group>
                  <IconButton
                    icon={<PlusIcon />}
                    appearance="primary"
                    color="green"
                    style={{
                      marginTop: 27,
                    }}
                    //onClick={handleSubmit}
                  >
                    Adicionar
                  </IconButton>
                </Form.Group>
              </Form>
              {tableCommercial.length !== 0 && (
                <Table data={tableCommercial} headerHeight={80}>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Entrada</HeaderCell>
                      <Cell dataKey="entry_time_commercial" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Inicio Pausa</HeaderCell>
                      <Cell dataKey="lunch_entry_time_commercial" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Termino Pausa</HeaderCell>
                      <Cell dataKey="lunch_out_time_commercial" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Saída</HeaderCell>
                      <Cell dataKey="out_time_commercial" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Ações</HeaderCell>
                      <Cell>
                        {(rowData: any) => {
                          return (
                            <>
                              <IconButton
                                icon={<CloseIcon />}
                                color="red"
                                appearance="subtle"
                              />
                            </>
                          );
                        }}
                      </Cell>
                    </Column>
                  </ColumnGroup>
                </Table>
              )}
            </>
          )}
          {openConsult && (
            <>
              <h5>Consulta Atendida</h5>
              <Form layout="inline" onChange={handleChangeConsult}>
                <Form.Group>
                  <Form.ControlLabel>Consulta</Form.ControlLabel>
                  <br />
                  <Form.Control name="consult" />
                </Form.Group>
                <Form.Group>
                  <Form.ControlLabel>Descrição</Form.ControlLabel>
                  <br />
                  <Form.Control name="description" />
                </Form.Group>
                <br />
                <Form.Group>
                  <IconButton
                    icon={<PlusIcon />}
                    appearance="primary"
                    color="green"
                    style={{
                      marginTop: 27,
                    }}
                    //onClick={handleSubmitConsult}
                  >
                    Adicionar
                  </IconButton>
                </Form.Group>
              </Form>
              {tableConsult.length !== 0 && (
                <Table data={tableConsult} headerHeight={80}>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Consulta</HeaderCell>
                      <Cell dataKey="consult" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Descrição</HeaderCell>
                      <Cell dataKey="description" />
                    </Column>
                  </ColumnGroup>
                  <ColumnGroup>
                    <Column>
                      <HeaderCell>Ações</HeaderCell>
                      <Cell>
                        {(rowData: any) => {
                          return (
                            <>
                              <IconButton
                                icon={<CloseIcon />}
                                color="red"
                                appearance="subtle"
                              />
                            </>
                          );
                        }}
                      </Cell>
                    </Column>
                  </ColumnGroup>
                </Table>
              )}
            </>
          )}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default CalendarPage;
