import BlockIcon from "@rsuite/icons/Block";
import CheckIcon from "@rsuite/icons/Check";
import VisibleIcon from "@rsuite/icons/Visible";
import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  Form,
  IconButton,
  Panel,
  SelectPicker,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import BreadcrumbComponent from "../../../components/Breadcrumb";
import { FormData } from "../../../types";
import {
  Circle,
  ContainerButtonPDF,
  ContainerStatus,
  Divider30,
  PulaLinha,
  Status,
  TitlePage,
  TitleRegistry,
} from "./styles";

const ReleaseCheckPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const [openModal, setOpenModal] = useState(false);
  const [disabled] = useState(false);
  const [select, setSelect] = useState("");
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [buttonPDF, setButtonPDF] = useState(false);
  const data = [
    {
      role: "Juliana Silva de Jesus",
      value: "Juliana Silva de Jesus",
      label: "Juliana Silva de Jesus",
    },
    {
      role: "Lucia Silva de Jesus",
      value: "Lucia Silva de Jesus",
      label: "Lucia Silva de Jesus",
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
      hour_NoCommercial: [
        {
          checkin: "17:01",
          pause_checkin: "18:30",
          pause_checkout: "19:00",
          checkout: "20:45",
        },
        {
          checkin: "21:00",
          checkout: "21:20",
        },
      ],
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
      status: true,
    },
    {
      date: "31/01/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
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
      status: false,
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
      status: true,
    },
    {
      date: "02/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      hour_NoCommercial: [
        {
          checkin: "17:01",
          pause_checkin: "18:30",
          pause_checkout: "19:00",
          checkout: "20:45",
        },
        {
          checkin: "21:00",
          checkout: "21:20",
        },
      ],
    },
    {
      date: "03/02/2023",
      checkin: "08:00",
      pause_checkin: "12:00",
      pause_checkout: "13:00",
      checkout: "17:00",
      bank_hours: "00:00",
      status: false,
    },
  ];

  return (
    <>
      <Panel
        header={<TitlePage className="title">Liberar Ficha Semanal</TitlePage>}
      >
        <BreadcrumbComponent
          active="Liberar Ficha Semanal"
          href="/dashboard"
          label="Dashboard"
        />
        <SelectPicker
          data={data}
          searchable={false}
          placeholder="Selecione o Colaborador"
          onSelect={(v) => {
            setSelect(v);
          }}
          onClean={() => {
            setSelect("");
            setButtonPDF(false);
          }}
          block
        />

        <Divider30 />
        {select !== "" && (
          <>
            <Table data={dateFuncionario} autoHeight>
              <Column width={150}>
                <HeaderCell>Data</HeaderCell>
                <Cell dataKey="date" />
              </Column>
              <Column width={110}>
                <HeaderCell>Entrada</HeaderCell>
                <Cell dataKey="checkin" />
              </Column>
              <Column width={110}>
                <HeaderCell>Inicio Pausa</HeaderCell>
                <Cell dataKey="pause_checkin" />
              </Column>
              <Column width={110}>
                <HeaderCell>Termino Pausa</HeaderCell>
                <Cell dataKey="pause_checkout" />
              </Column>
              <Column width={110}>
                <HeaderCell>Saída</HeaderCell>
                <Cell dataKey="checkout" />
              </Column>
              <Column width={120} align="center">
                <HeaderCell>Consultas</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    return (
                      <>
                        {rowData.activities ? (
                          <ContainerStatus>
                            <Circle
                              style={{
                                backgroundColor: "green",
                              }}
                            />
                            <Status>SIM</Status>
                          </ContainerStatus>
                        ) : (
                          <ContainerStatus>
                            <Circle
                              style={{
                                backgroundColor: "red",
                              }}
                            />
                            <Status>NÃO</Status>
                          </ContainerStatus>
                        )}
                      </>
                    );
                  }}
                </Cell>
              </Column>
              <Column width={150} align="center">
                <HeaderCell>Horário Não Comercial</HeaderCell>
                <Cell>
                  {(rowData: any) => {
                    return (
                      <>
                        {rowData.hour_NoCommercial ? (
                          <ContainerStatus>
                            <Circle
                              style={{
                                backgroundColor: "green",
                              }}
                            />
                            <Status>SIM</Status>
                          </ContainerStatus>
                        ) : (
                          <ContainerStatus>
                            <Circle
                              style={{
                                backgroundColor: "red",
                              }}
                            />
                            <Status>NÃO</Status>
                          </ContainerStatus>
                        )}
                      </>
                    );
                  }}
                </Cell>
              </Column>
              <Column width={300} align="center">
                <HeaderCell>Ações</HeaderCell>
                <Cell>
                  {(rowData: any, rowIndex: any) => {
                    return (
                      <>
                        <ButtonGroup>
                          {rowData.status === true ? (
                            <Whisper
                              placement="top"
                              controlId="control-id-focus"
                              trigger="hover"
                              speaker={<Tooltip>Visualizar Detalhes</Tooltip>}
                            >
                              <IconButton
                                icon={<VisibleIcon />}
                                onClick={() => {
                                  setOpenModal(true);
                                  setFormData(rowData);
                                }}
                                appearance="primary"
                                style={{ backgroundColor: "#00a6a6" }}
                              />
                            </Whisper>
                          ) : (
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
                                    setOpenModal(true);
                                    setFormData(rowData);
                                  }}
                                  appearance="primary"
                                  style={{ backgroundColor: "#00a6a6" }}
                                />
                              </Whisper>
                              <Whisper
                                placement="top"
                                controlId="control-id-focus"
                                trigger="hover"
                                speaker={<Tooltip>Aprovar</Tooltip>}
                              >
                                <IconButton
                                  icon={<CheckIcon />}
                                  onClick={() => {
                                   // console.log(rowData);
                                    setButtonPDF(true);
                                  }}
                                  appearance="primary"
                                  color="green"
                                />
                              </Whisper>
                              <Whisper
                                placement="top"
                                controlId="control-id-focus"
                                trigger="hover"
                                speaker={<Tooltip>Reprovar</Tooltip>}
                              >
                                <IconButton
                                  icon={<BlockIcon />}
                                 // onClick={() => console.log(rowData)}
                                  appearance="primary"
                                  color="red"
                                />
                              </Whisper>
                            </>
                          )}
                        </ButtonGroup>
                      </>
                    );
                  }}
                </Cell>
              </Column>
            </Table>
          </>
        )}
        {buttonPDF && (
          <ContainerButtonPDF>
            <Button
              appearance="primary"
              style={{ backgroundColor: "#00a6a6", width: 150 }}
            >
              Gerar PDF
            </Button>
          </ContainerButtonPDF>
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
            <TitleRegistry>{select}</TitleRegistry>
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

            {formData.hour_NoCommercial !== undefined && (
              <>
               
                <Divider>Horário Não Comercial</Divider>

                <Table data={formData.hour_NoCommercial}>
                  <Column>
                    <HeaderCell>Entrada:</HeaderCell>
                    <Cell dataKey="checkin" />
                  </Column>
                  <Column>
                    <HeaderCell>Inicio Pausa:</HeaderCell>
                    <Cell dataKey="pause_checkin" />
                  </Column>
                  <Column>
                    <HeaderCell>Termino Pausa:</HeaderCell>
                    <Cell dataKey="pause_checkout" />
                  </Column>
                  <Column>
                    <HeaderCell>Sáida:</HeaderCell>
                    <Cell dataKey="checkout" />
                  </Column>
                </Table>
              </>
            )}

            {formData.activities !== undefined && (
              <>
                <Divider>Consultas Registradas no dia</Divider>
               
                <Table data={formData.activities}>
                  <Column>
                    <HeaderCell>Nº Consulta:</HeaderCell>
                    <Cell dataKey="consult" />
                  </Column>
                  <Column>
                    <HeaderCell>Descrição:</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
                </Table>
              </>
            )}
            <Divider />
          </Form>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
export default ReleaseCheckPoint;
