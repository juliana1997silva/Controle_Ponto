import React, { useEffect, useState } from "react";
import { Button, Drawer, Form, Panel, SelectPicker, Table } from "rsuite";
import Textarea from "../../components/TextArea";
import { FormData } from "../../types";
import { Container } from "./styles";

const ReleaseHour: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [openModal, setOpenModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [select, setSelect] = useState("");
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const data = [
    {
      role: "Juliana Silva de Jesus",
      value: "Juliana Silva de Jesus",
      label: "Juliana Silva de Jesus",
    },
    {
      role: "Guilherme Silva de Jesus",
      value: "Guilherme Silva de Jesus",
      label: "Guilherme Silva de Jesus",
    },
    {
      role: "Maria Silva de Jesus",
      value: "Maria Silva de Jesus",
      label: "Maria Silva de Jesus",
    },
    {
      role: "Jose Silva de Jesus",
      value: "Jose Silva de Jesus",
      label: "Jose Silva de Jesus",
    },
  ];

  const dateFuncionario = [
    {
      date: "30/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "31/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "01/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "02/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
    {
      date: "03/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: "Desenvolvimento .......",
    },
  ];

  useEffect(() => {
    console.log(select);
  });

  return (
    <>
      <Panel header={<h3 className="title">Liberação de Ficha Home-Office</h3>}>
        <SelectPicker
          data={data}
          style={{ width: 224 }}
          searchable={false}
          placeholder="Selecione o Colaborador"
          onSelect={(v) => {
            setSelect(v);
          }}
          onClean={() => setSelect("")}
        />
        <div style={{ padding: 30 }} />
        {select !== "" && (
          <>
            <h5>Colaborador(a): {select}</h5>
            <br />
            <Container />
            <Container />
            <Table data={dateFuncionario} autoHeight>
              <Column width={150}>
                <HeaderCell>Data</HeaderCell>
                <Cell dataKey="date" />
              </Column>
              <Column width={150}>
                <HeaderCell>Entrada</HeaderCell>
                <Cell dataKey="checkin" />
              </Column>
              <Column width={150}>
                <HeaderCell>Inicio Pausa</HeaderCell>
                <Cell dataKey="pause_checkin" />
              </Column>
              <Column width={150}>
                <HeaderCell>Termino Pausa</HeaderCell>
                <Cell dataKey="pause_checkout" />
              </Column>
              <Column width={150}>
                <HeaderCell>Saída</HeaderCell>
                <Cell dataKey="checkout" />
              </Column>
              <Column width={150}>
                <HeaderCell>Banco de Horas</HeaderCell>
                <Cell dataKey="bank_hours" />
              </Column>
              <Column width={300}>
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(rowData: any, rowIndex: any) => {
                    return (
                      <>
                        <Button
                          color="green"
                          appearance="primary"
                          onClick={() => {
                            console.log(rowData);
                            setOpenModal(true);
                            setFormData(rowData);
                            setDisabled(true);
                          }}
                        >
                          Visualizar
                        </Button>
                      </>
                    );
                  }}
                </Cell>
              </Column>
            </Table>
            <div style={{ textAlign: "end", paddingTop: 50 }}>
              <Button
                color="green"
                appearance="primary"
                style={{ width: 130, margin: 10 }}
              >
                Aprovar
              </Button>
              <Button color="red" appearance="primary" style={{ width: 130 }}>
                Reprovar
              </Button>
            </div>
          </>
        )}
      </Panel>

      <Drawer
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Drawer.Body>
          <Form formDefaultValue={formData}>
            <h4>Registro de Ponto - {select}</h4>
            <br />
            <Form.ControlLabel>Data:</Form.ControlLabel>
            <Form.Control name="date" disabled={disabled} />
            <Form.ControlLabel>Entrada:</Form.ControlLabel>
            <Form.Control name="checkin" disabled={disabled} />
            <Form.ControlLabel>Inicio Pausa:</Form.ControlLabel>
            <Form.Control name="pause_checkin" disabled={disabled} />
            <Form.ControlLabel>Termino Pausa</Form.ControlLabel>
            <Form.Control name="pause_checkout" disabled={disabled} />
            <Form.ControlLabel>Saida</Form.ControlLabel>
            <Form.Control name="checkout" disabled={disabled} />
            <Form.ControlLabel>Banco de Horas</Form.ControlLabel>
            <Form.Control name="bank_hours" disabled={disabled} />
            <Form.ControlLabel>Atividades</Form.ControlLabel>
            <Form.Control
              name="activities"
              disabled={disabled}
              accepter={Textarea}
            />
          </Form>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
export default ReleaseHour;
