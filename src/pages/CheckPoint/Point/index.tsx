import 'moment/locale/pt-br';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input, MaskedInput, Panel, SelectPicker, Table } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { useAuth } from '../../../hooks/hooksAuth';
import ListPoint from '../ListPoint';
import { consultsData, nonBusinessData, timeData, useCheckPoint } from '../hooks/hookCheckPoint';
import { TextEdit, TitlePage } from './styles';

const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

const Point: React.FC = () => {
  const { user } = useAuth();
  const { registerPoint, dataRegisterStore, mode, updatePoint, updateData } = useCheckPoint();
  const { Column, HeaderCell, Cell } = Table;
  const [formDataTime, setFormDataTime] = useState<timeData>({} as timeData);
  const [formDataNonBusiness, setFormDataNonBusiness] = useState<nonBusinessData>({} as nonBusinessData);
  const [formDataConsults, setFormDataConsults] = useState<consultsData>({} as consultsData);
  const [businessData, setBusinessData] = useState<nonBusinessData[]>([] as nonBusinessData[]);
  const [dataConsults, setDataConsults] = useState<consultsData[]>([] as consultsData[]);
  const [consultsMode, setConsultsMode] = useState<'create' | 'edit'>('create');
  const [hourMode, setHourMode] = useState<'create' | 'edit'>('create');
  const [showBack, setShowBack] = useState(false);

  const handleChangeTime = useCallback(
    (form: timeData) => {
      setFormDataTime(form);
    },
    [setFormDataTime]
  );

  const handleChangeNonBusiness = useCallback(
    (form: nonBusinessData) => {
      //console.log('form nonbusiness => ', form);
      setFormDataNonBusiness(form);
    },
    [setFormDataNonBusiness]
  );

  const handleChangeConsultation = useCallback(
    (form: consultsData) => {
      //console.log('form consults => ', form);
      setFormDataConsults(form);
    },
    [setFormDataConsults]
  );

  const handleAddNonBusiness = useCallback(() => {
    businessData.push({
      id: formDataNonBusiness.id,
      registry_id: formDataNonBusiness.registry_id,
      entry_time: formDataNonBusiness.entry_time,
      lunch_entry_time: formDataNonBusiness.lunch_entry_time ? formDataNonBusiness.lunch_entry_time : null,
      lunch_out_time: formDataNonBusiness.lunch_out_time ? formDataNonBusiness.lunch_out_time : null,
      out_time: formDataNonBusiness.out_time
    });
    setFormDataNonBusiness({} as nonBusinessData);
    if (hourMode === 'edit') setHourMode('create');
  }, [businessData, formDataNonBusiness, setFormDataNonBusiness, hourMode, setHourMode]);

  const handleEditHour = useCallback(
    (data: nonBusinessData) => {
      const filterData = businessData.filter((result) => result.id !== data.id);
      setHourMode('edit');
      setBusinessData(filterData);
      setFormDataNonBusiness(data);
    },
    [setFormDataNonBusiness, businessData, setBusinessData, setHourMode]
  );

  const handleDeleteHour = useCallback(
    (data: nonBusinessData) => {
      const filterData = businessData.filter((result) => result.id !== data.id);
      setBusinessData(filterData);
    },
    [businessData, setBusinessData]
  );

  const handleEditConsults = useCallback(
    (data: consultsData) => {
      const filterData = dataConsults.filter((result) => result.id !== data.id);
      setConsultsMode('edit');
      setDataConsults(filterData);
      setFormDataConsults(data);
    },
    [setFormDataConsults, dataConsults, setDataConsults, setConsultsMode]
  );

  const handleDeleteConsults = useCallback(
    (data: nonBusinessData) => {
      const filterData = dataConsults.filter((result) => result.id !== data.id);
      setDataConsults(filterData);
    },
    [dataConsults, setDataConsults]
  );

  const handleAddConsults = useCallback(() => {
    dataConsults.push({
      id: formDataConsults.id,
      registry_id: formDataConsults.registry_id,
      queries: formDataConsults.queries,
      description: formDataConsults.description
    });
    setFormDataConsults({} as consultsData);
    if (consultsMode === 'edit') setConsultsMode('create');
  }, [formDataConsults, dataConsults, setFormDataConsults, consultsMode, setConsultsMode]);

  const handleSubmit = useCallback(() => {
    if (mode === 'created') {
      if (formDataTime.location !== undefined && formDataTime.date !== undefined) {
        registerPoint(formDataTime, businessData, dataConsults);
       //console.log(formDataTime);
      } else {
        toast.error('Por favor, preencha todos os campos');
      }
    } else {
      updatePoint(formDataTime, businessData, dataConsults);
    }
    setFormDataTime({} as timeData);
    setDataConsults({} as consultsData[]);
    setBusinessData({} as nonBusinessData[]);
  }, [registerPoint, formDataTime, businessData, dataConsults, setFormDataTime, updatePoint, setDataConsults, setBusinessData, mode]);

  useEffect(() => {
    if (mode === 'edit') {
      if (dataRegisterStore) {
        setFormDataTime(dataRegisterStore);

        if (dataRegisterStore.consults) {
          setDataConsults(dataRegisterStore.consults);
        } else if (dataRegisterStore.nonbusiness) {
          setBusinessData(dataRegisterStore.nonbusiness);
        }
      }
    }
  }, [mode, dataRegisterStore, setDataConsults, setBusinessData, setFormDataTime]);

  useEffect(() => {
    if (updateData) setShowBack(true);
  }, [updateData, setShowBack]);

  useEffect(() => {
    setFormDataTime((prevTime: timeData) => ({
      ...prevTime,
      entry_time: user.entry_time,
      lunch_entry_time: user.lunch_entry_time,
      lunch_out_time: user.lunch_out_time,
      out_time: user.out_time
    }));
  }, [setFormDataTime, user]);

  //console.log('dataRegisterStore:: ', dataRegisterStore);
  console.log('formDataTime:: ', formDataTime);

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
          <Button
            appearance="primary"
            color="red"
            onClick={() => {
              setShowBack(true);
              setFormDataTime({} as timeData);
              setDataConsults({} as consultsData[]);
              setBusinessData({} as nonBusinessData[]);
            }}
          >
            Voltar
          </Button>
        </div>

        <Form layout="inline" onChange={handleChangeTime} formValue={formDataTime}>
          <Form.Group>
            <Form.ControlLabel>Data</Form.ControlLabel>
            <br />
            <Form.Control
              name="date"
              style={{width: 200}}
              accepter={MaskedInput}
              placeholder="Data"
              showMask={true}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Local</Form.ControlLabel>
            <br />
            <Form.Control
              name="location"
              placeholder="Selecione"
              accepter={SelectPicker}
              data={[
                { label: 'Home-Office', value: 'Home-Office' },
                { label: 'Em Cliente', value: 'Em Cliente' },
                { label: 'Presencial', value: 'Presencial' }
              ]}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Entrada</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="entry_time" style={{ width: 188 }} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Almoço</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="lunch_entry_time" style={{ width: 188 }} />
            <Form.Control type="time" name="lunch_out_time" style={{ width: 188, marginLeft: 10 }} />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Saída</Form.ControlLabel>
            <br />
            <Form.Control type="time" name="out_time" style={{ width: 188 }} />
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
                <Button appearance="primary" style={{ width: 120, backgroundColor: '#1976D2' }} onClick={handleAddNonBusiness}>
                  {hourMode === 'edit' ? 'Editar' : 'Adicionar'}
                </Button>
              </Form.Group>
              {businessData && businessData.length !== 0 && (
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
                    <Column width={300}>
                      <HeaderCell>Ações</HeaderCell>
                      <Cell>
                        {(rowData: any) => (
                          <>
                            <Button
                              appearance="primary"
                              color="blue"
                              onClick={() => {
                                handleEditHour(rowData);
                              }}
                            >
                              Editar
                            </Button>
                            {rowData.id && (
                              <Button
                                appearance="primary"
                                color="red"
                                onClick={() => {
                                  handleDeleteHour(rowData);
                                }}
                              >
                                Excluir
                              </Button>
                            )}
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
                  style={{ width: 120, backgroundColor: '#1976D2', marginRight: 25 }}
                  onClick={handleAddConsults}
                >
                  {consultsMode === 'edit' ? 'Editar' : 'Adicionar'}
                </Button>
              </Form.Group>
              {dataConsults && dataConsults.length !== 0 && (
                <Table data={dataConsults}>
                  <Column width={100} align="center">
                    <HeaderCell>Nº Consulta</HeaderCell>
                    <Cell dataKey="queries" />
                  </Column>
                  <Column width={300}>
                    <HeaderCell>Descrição</HeaderCell>
                    <Cell dataKey="description" />
                  </Column>
                  <Column width={300}>
                    <HeaderCell>Ações</HeaderCell>
                    <Cell>
                      {(rowData: any) => (
                        <>
                          {rowData.id ? (
                            <>
                              <Button
                                appearance="primary"
                                color="blue"
                                onClick={() => {
                                  handleEditConsults(rowData);
                                }}
                              >
                                Editar
                              </Button>

                              <Button
                                appearance="primary"
                                color="red"
                                onClick={() => {
                                  handleDeleteConsults(rowData);
                                }}
                              >
                                Excluir
                              </Button>
                            </>
                          ) : (
                            <TextEdit>Clique em "Salvar" para finalizar a edição</TextEdit>
                          )}
                        </>
                      )}
                    </Cell>
                  </Column>
                </Table>
              )}
            </Form>
          </Panel>
          <br />
          <Form.Group style={{ width: '100%', textAlign: 'end' }}>
            <Button appearance="primary" style={{ width: 120, marginRight: 20, backgroundColor: '#1976D2' }} onClick={handleSubmit}>
              Salvar
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </>
  );
};

export default Point;
