import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Drawer,
  Form,
  Panel,
  SelectPicker,
  Table,
} from "rsuite";
import { FormData } from "../../types";
import {
  Collaborator,
  ContainerButton,
  Divider30,
  NoData,
  PulaLinha,
  TitlePage,
  TitleRegistry,
} from "./styles";

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
      activities: [
        {
          consult: "25368",
          description: "Teste 0001",
        },
        {
          consult: "58693",
          description: "Teste 0002",
        },
      ],
    },
    {
      date: "31/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: [
        {
          consult: "25368",
          description: "Teste 0001",
        },
        {
          consult: "58693",
          description: "Teste 0002",
        },
      ],
    },
    {
      date: "01/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      activities: [
        {
          consult: "25368",
          description: "Teste 0001",
        },
        {
          consult: "58693",
          description: "Teste 0002",
        },
      ],
    },
    {
      date: "02/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
    },
    {
      date: "03/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
    },
  ];

  useEffect(() => {
    console.log(select);
  });

  return (
    <>
      <Panel
        header={
          <TitlePage className="title">
            Liberação de Ficha Home-Office
          </TitlePage>
        }
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Liberação de Ficha Home-Office
          </Breadcrumb.Item>
        </Breadcrumb>
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
        <Divider30 />
        {select !== "" && (
          <>
            <Collaborator>Colaborador(a): {select}</Collaborator>
            <PulaLinha />
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
            <ContainerButton>
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
            </ContainerButton>
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
            <TitleRegistry>Registro de Ponto - {select}</TitleRegistry>
            <PulaLinha />
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
            {formData.activities !== undefined ? (
              <>
                {console.log(formData.activities)}
                <Table data={formData.activities}>
                  <Column>
                    <HeaderCell>Consulta:</HeaderCell>
                    <Cell dataKey="consult" />
                  </Column>
                  <Column>
                    <HeaderCell>Resumo:</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
                </Table>
              </>
            ) : (
              <>
                <NoData>Sem Consulta</NoData>
              </>
            )}
          </Form>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
export default ReleaseHour;
