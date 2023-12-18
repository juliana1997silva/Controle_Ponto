import React, { useCallback, useEffect, useState } from 'react';
//import moment from 'moment';
import { Button, DatePicker, Form, Input, Panel, SelectPicker, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import ListPoint from '../ListPoint';
import { consultsData, nonBusinessData, timeData, useCheckPoint } from '../hooks/hookCheckPoint';
import { TitlePage } from './styles';

const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const Point: React.FC = () => {
  const { registerPoint, dataRegisterStore, mode } = useCheckPoint();
  const { Column, HeaderCell, Cell } = Table;
  const [formDataTime, setFormDataTime] = useState<timeData>({} as timeData);
  const [formDataNonBusiness, setFormDataNonBusiness] = useState<nonBusinessData>({} as nonBusinessData);
  const [formDataConsults, setFormDataConsults] = useState<consultsData>({} as consultsData);
  const [businessData, setBusinessData] = useState<nonBusinessData[]>([] as nonBusinessData[]);
  const [dataConsults, setDataConsults] = useState<consultsData[]>([] as consultsData[]);
  const [showBack, setShowBack] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  const handleChangeTime = useCallback(
    (form: timeData) => {
      console.log('form time => ', form);
      setFormDataTime(form);
    },
    [setFormDataTime]
  );

  const handleChangeNonBusiness = useCallback(
    (form: nonBusinessData) => {
      console.log('form nonbusiness => ', form);
      setFormDataNonBusiness(form);
    },
    [setFormDataNonBusiness]
  );

  const handleChangeConsultation = useCallback(
    (form: consultsData) => {
      console.log('form consults => ', form);
      setFormDataConsults(form);
    },
    [setFormDataConsults]
  );

  const handleAddNonBusiness = useCallback(() => {
    businessData.push({
      entry_time: formDataNonBusiness.entry_time,
      lunch_entry_time: formDataNonBusiness.lunch_entry_time,
      lunch_out_time: formDataNonBusiness.lunch_out_time,
      out_time: formDataNonBusiness.out_time
    });
    setFormDataNonBusiness({} as nonBusinessData);
  }, [businessData, formDataNonBusiness, setFormDataNonBusiness]);

  const handleEditHour = useCallback(
    (data: nonBusinessData) => {
      businessData.filter((result) => result.id !== data.id);
      setFormDataNonBusiness(data);
    },
    [setFormDataNonBusiness, businessData]
  );

  const handleAddConsults = useCallback(() => {
    dataConsults.push({
      queries: formDataConsults.queries,
      description: formDataConsults.description
    });
    setFormDataConsults({} as consultsData);
  }, [formDataConsults, dataConsults, setFormDataConsults]);

  const handleSubmit = useCallback(() => {
    registerPoint(formDataTime, businessData, dataConsults);
    setFormDataTime({} as timeData);
  }, [registerPoint, formDataTime, businessData, dataConsults, setFormDataTime]);

  useEffect(() => {
    if (mode === 'edit') {
      setDisabledForm(true);
      if (dataRegisterStore) {
        if (dataRegisterStore.business) setFormDataTime(dataRegisterStore.business);
        if (dataRegisterStore.consults) setDataConsults(dataRegisterStore.consults);
        if (dataRegisterStore.nonbusiness) setBusinessData(dataRegisterStore.nonbusiness);
      }
    }
  }, [mode, setDataConsults, setBusinessData, setFormDataTime, dataRegisterStore, setDisabledForm]);


  if (showBack) {
    return <ListPoint />;
  }
  return (
    <>
      <Panel header={<TitlePage className="title">Registro de Ponto</TitlePage>}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <BreadcrumbComponent active="Registro de Ponto" href="/dashboard" label="Dashboard" />
          <Button appearance="primary" color="red" onClick={() => setShowBack(true)}>
            Voltar
          </Button>
        </div>

        <Form layout="inline" onChange={handleChangeTime} formValue={formDataTime}>
          <Form.Group>
            <Form.ControlLabel>Data</Form.ControlLabel>
            <br />
            <Form.Control accepter={DatePicker} placeholder="DD/MM/AAAA" name="date" disabled={disabledForm} format="DD-MM-YYYY" sele />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Local</Form.ControlLabel>
            <br />
            <Form.Control
              accepter={SelectPicker}
              name="location"
              placeholder="Selecione"
              searchable={false}
              style={{ width: 215 }}
              data={[
                {
                  value: 'Home-Office',
                  label: 'Home-Office'
                },
                {
                  value: 'Em Cliente',
                  label: 'Em Cliente'
                },
                {
                  value: 'Presencial',
                  label: 'Presencial'
                }
              ]}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Entrada</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="entry_time" style={{ width: 188 }} disabled={disabledForm} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Almoço</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="lunch_entry_time" style={{ width: 188 }} disabled={disabledForm} />
            <Form.Control type="time" name="lunch_out_time" style={{ width: 188, marginLeft: 10 }} disabled={disabledForm} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Saída</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="out_time" style={{ width: 188 }} disabled={disabledForm} />
          </Form.Group>

          <Panel header="Horário Não Comercial " collapsible bordered>
            <Form onChange={handleChangeNonBusiness} formValue={formDataNonBusiness}>
              <Form.Group>
                <Form.ControlLabel>Entrada</Form.ControlLabel>
                <br />
                <Form.Control type="time" name="entry_time" style={{ width: 200 }} />
              </Form.Group>
              <Form.Group style={{ marginLeft: 10 }}>
                <Form.ControlLabel>Pausa</Form.ControlLabel>
                <br />
                <Form.Control type="time" name="lunch_entry_time" style={{ width: 200 }} />
                <Form.Control type="time" name="lunch_out_time" style={{ width: 200, marginLeft: 10 }} />
              </Form.Group>
              <Form.Group style={{ marginLeft: 10 }}>
                <Form.ControlLabel>Saída</Form.ControlLabel>
                <br />
                <Form.Control type="time" name="out_time" style={{ width: 200 }} />
              </Form.Group>
              <Form.Group style={{ marginLeft: 10, marginTop: 9 }}>
                <br />
                <Button appearance="primary" style={{ width: 120, backgroundColor: '#00a6a6' }} onClick={handleAddNonBusiness}>
                  Adicionar
                </Button>
              </Form.Group>
              {businessData.length !== 0 && (
                <>
                  <Table data={businessData}>
                    <Column width={100} align="center">
                      <HeaderCell>Entrada</HeaderCell>
                      <Cell dataKey="entry_time" />
                    </Column>
                    <Column width={100} align="center">
                      <HeaderCell>Ínicio Pausa</HeaderCell>
                      <Cell dataKey="lunch_entry_time" />
                    </Column>
                    <Column width={100} align="center">
                      <HeaderCell>Término Pausa</HeaderCell>
                      <Cell dataKey="lunch_out_time" />
                    </Column>
                    <Column width={100} align="center">
                      <HeaderCell>Saída</HeaderCell>
                      <Cell dataKey="out_time" />
                    </Column>
                    <Column width={100}>
                      <HeaderCell>Ações</HeaderCell>
                      <Cell>
                        {(rowData: any) => (
                          <>
                            <Button
                              appearance="primary"
                              color="blue"
                              onClick={() => {
                                
                                handleEditHour(rowData)
                              }}
                            >
                              Editar
                            </Button>
                          </>
                        )}
                      </Cell>
                    </Column>
                  </Table>
                </>
              )}
            </Form>
          </Panel>
          <Panel header="Consultas Atendidas " collapsible bordered>
            <Form onChange={handleChangeConsultation} formValue={formDataConsults}>
              <Form.Group>
                <Form.ControlLabel>Nº Consulta</Form.ControlLabel>
                <Form.Control name="queries" />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.ControlLabel>Descrição</Form.ControlLabel>

                <Form.Control rows={5} accepter={Textarea} name="description" />
              </Form.Group>
              <br />
              <Form.Group style={{ marginLeft: 10, marginTop: 9, textAlign: 'end', width: '100%' }}>
                <Button
                  appearance="primary"
                  style={{ width: 120, backgroundColor: '#00a6a6', marginRight: 25 }}
                  onClick={handleAddConsults}
                >
                  Adicionar
                </Button>
              </Form.Group>
              {dataConsults.length !== 0 && (
                <Table data={dataConsults}>
                  <Column width={100} align="center">
                    <HeaderCell>Nº Consulta</HeaderCell>
                    <Cell dataKey="queries" />
                  </Column>
                  <Column width={300}>
                    <HeaderCell>Descrição</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
                  <Column width={100}>
                    <HeaderCell>Ações</HeaderCell>
                    <Cell>
                      {(rowData: any) => (
                        <>
                          <Button
                            appearance="primary"
                            color="blue"
                            onClick={() => {
                              setFormDataConsults(rowData);
                            }}
                          >
                            Editar
                          </Button>
                        </>
                      )}
                    </Cell>
                  </Column>
                </Table>
              )}
            </Form>
          </Panel>
          <Form.Group>
            <Form.ControlLabel>Observação</Form.ControlLabel>
            <br />
            <Form.Control rows={6} accepter={Textarea} name="observation" />
          </Form.Group>
          <br />
          <Form.Group style={{ width: '100%', textAlign: 'end' }}>
            <Button appearance="primary" style={{ width: 120, marginRight: 20, backgroundColor: '#00a6a6' }} onClick={handleSubmit}>
              Salvar
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </>
  );
};

export default Point;
