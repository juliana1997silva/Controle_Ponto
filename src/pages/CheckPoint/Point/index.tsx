import React, { useCallback } from 'react';
import { Button, DatePicker, Form, Input, Panel, SelectPicker } from 'rsuite';
import BreadcrumbComponent from '../../../components/Breadcrumb';
import { dataForm } from '../hooks/hookCheckPoint';
import { TitlePage } from './styles';

const Point: React.FC = () => {
  const Textarea = React.forwardRef((props: any, ref: any) => <Input {...props} as="textarea" ref={ref} />);

  const handleChange = useCallback((form: dataForm) => {
    console.log('form normal => ', form);
  }, []);

  return (
    <>
      <Panel header={<TitlePage className="title">Registro de Ponto</TitlePage>}>
        <BreadcrumbComponent active="Registro de Ponto" href="/dashboard" label="Dashboard" />

        <Form layout="inline" onChange={handleChange}>
          <Form.Group>
            <Form.ControlLabel>Data</Form.ControlLabel>
            <br />
            <DatePicker placeholder="DD/MM/AAAA" name="data" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Local</Form.ControlLabel>
            <br />
            <SelectPicker
              name="location"
              placeholder="Selecione"
              searchable={false}
              style={{ width: 215 }}
              data={[
                {
                  value: 1,
                  label: 'HOME OFFICE'
                },
                {
                  value: 2,
                  label: 'EM CLIENTE'
                },
                {
                  value: 3,
                  label: 'PRESENCIAL'
                }
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
            {' '}
            {/* style={{ width: '93%' }} */}
            <Form.Group>
              <Form.ControlLabel>Entrada</Form.ControlLabel>
              <br />
              <Form.Control type="time" name="entry_time_nocommercial" style={{ width: 200 }} />
            </Form.Group>
            <Form.Group style={{ marginLeft: 10 }}>
              <Form.ControlLabel>Almoço</Form.ControlLabel>
              <br />
              <Form.Control type="time" name="lunch_entry_time_nocommercial" style={{ width: 200 }} />
              <Form.Control type="time" name="lunch_out_time_nocommercial" style={{ width: 200, marginLeft: 10 }} />
            </Form.Group>
            <Form.Group style={{ marginLeft: 10 }}>
              <Form.ControlLabel>Saída</Form.ControlLabel>
              <br />
              <Form.Control type="time" name="out_time_nocommercial" style={{ width: 200 }} />
            </Form.Group>
            <Form.Group style={{ marginLeft: 10, marginTop: 9 }}>
              <br />
              <Button appearance="primary" style={{ width: 120, backgroundColor: '#00a6a6' }}>
                Adicionar
              </Button>
            </Form.Group>
          </Panel>
          <Panel header="Consultas Atendidas " collapsible bordered>
            <Form.Group>
              <Form.ControlLabel>Nº Consulta</Form.ControlLabel>
              <Form.Control name="consultation" />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.ControlLabel>Descrição</Form.ControlLabel>

              <Form.Control rows={5} accepter={Textarea} name="description" style={{ width: 1135 }} />
            </Form.Group>
            <br />
            <Form.Group style={{ marginLeft: 10, marginTop: 9, textAlign: 'end', width: '100%' }}>
              <Button appearance="primary" style={{ width: 120, backgroundColor: '#00a6a6', marginRight: 25 }}>
                Adicionar
              </Button>
            </Form.Group>
          </Panel>
          <Form.Group>
            <Form.ControlLabel>Observação</Form.ControlLabel>
            <br />
            <Form.Control rows={6} accepter={Textarea} name="observation" style={{ width: 1200 }} />
          </Form.Group>
          <br />
          <Form.Group style={{ width: '100%', textAlign: 'end' }}>
            <Button appearance="primary" style={{ width: 120, marginRight: 20, backgroundColor: '#00a6a6' }}>
              Adicionar
            </Button>
          </Form.Group>
        </Form>
      </Panel>
    </>
  );
};

export default Point;
