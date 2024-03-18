import { EventImpl } from '@fullcalendar/core/internal';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Button, Checkbox, CustomProvider, Form, Input, Modal, ModalProps, Stack } from 'rsuite';
import 'rsuite-color-picker/lib/styles.css';
import ptBR from 'rsuite/locales/pt_BR';
import { EventsData, useCalendar } from '../../../hooks/hooksCalendar';

interface EventModalProps extends ModalProps {
  date: Date;
  rowData: EventImpl;
  allDay: boolean;
}

const EventModal = (props: EventModalProps) => {
  const { onClose, open, date, rowData, ...rest } = props;
  const { createEvents, mode, updateEvents } = useCalendar();
  const [dataForm, setDataForm] = useState<EventsData>({} as EventsData);
  const [disabledDate, setDisabledDate] = useState(false);
  const [check] = useState(false);

  const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];

  const handleChange = useCallback(
    (form: EventsData) => {
      //console.log(form);
      setDataForm(form);
    },
    [setDataForm]
  );

  const handleSubmit = useCallback(() => {
    if (mode === 'create') {
      createEvents(dataForm);
    } else {
      updateEvents(dataForm);
    }
  }, [createEvents, dataForm, updateEvents, mode]);

  useEffect(() => {
    setDataForm({
      id: rowData.id,
      allDay: rowData.allDay,
      backgroundColor: rowData.backgroundColor,
      end: rowData.end ? moment(rowData.end).format('YYYY-MM-DDTHH:mm') : moment(String(date)).format('YYYY-MM-DDTHH:mm'),
      start: rowData.start ? moment(rowData.start).format('YYYY-MM-DDTHH:mm') : moment(String(date)).format('YYYY-MM-DDTHH:mm'),
      title: rowData.title
    });
  }, [setDataForm, rowData, date]);

  useEffect(() => {
    if (dataForm.allDay === true) {
      setDisabledDate(true);
    } else {
      setDisabledDate(false);
    }
  }, [check, setDisabledDate, dataForm]);

  return (
    <Modal open={open} onClose={onClose} backdrop="static" onExit={() => setDataForm({} as EventsData)} {...rest}>
      <Modal.Header>
        <Modal.Title>Adicionar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={handleChange} formValue={dataForm}>
          <Form.Group controlId="title">
            <Form.ControlLabel>Nome</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>
          <Form.Group controlId="backgroundColor">
            <Popup
              trigger={
                <>
                  <Button>Cor</Button>
                </>
              }
            >
              <div className="crud-color-row">
                {colors.map((color, index) =>
                  index < 5 ? (
                    <div key={index} data-value={color}>
                      <div style={{ background: color }}></div>
                    </div>
                  ) : null
                )}
              </div>
              <div className="crud-color-row">
                {colors.map((color, index) =>
                  index >= 5 ? (
                    <div key={index} data-value={color}>
                      <div style={{ background: color }}></div>
                    </div>
                  ) : null
                )}
              </div>
            </Popup>
          </Form.Group>
          <Form.Group controlId="allDay">
            <Form.Control
              accepter={Checkbox}
              name="allDay"
              onChange={(e: any, v: any) =>
                setDataForm((prevState: EventsData) => ({
                  ...prevState,
                  allDay: v
                }))
              }
            >
              Dia Todo
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="start">
            <Form.ControlLabel>Ínicio</Form.ControlLabel>
            <Stack spacing={6}>
              <CustomProvider locale={ptBR}>
                <Form.Control name="start" accepter={Input} type="datetime" disabled={disabledDate} />
              </CustomProvider>
            </Stack>
          </Form.Group>

          <Form.Group controlId="end">
            <Form.ControlLabel>Término</Form.ControlLabel>
            <Stack spacing={6}>
              <CustomProvider locale={ptBR}>
                <Form.Control name="end" accepter={Input} type="datetime" disabled={disabledDate} />
              </CustomProvider>
            </Stack>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          {mode === 'create' ? 'Adicionar' : 'Editar'}
        </Button>
        <Button onClick={onClose} appearance="primary" color="red">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
