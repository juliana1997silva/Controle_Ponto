import { DateClickArg } from '@fullcalendar/interaction';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, CustomProvider, DatePicker, Form, Modal, ModalProps, SelectPicker, Stack } from 'rsuite';
import ColorPicker from 'rsuite-color-picker';
import 'rsuite-color-picker/lib/styles.css';
import ptBR from 'rsuite/locales/pt_BR';
import { EventsData, useCalendar } from '../../../hooks/hooksCalendar';

interface EventModalProps extends ModalProps {
  rowData: DateClickArg;
}

const EventModal = (props: EventModalProps) => {
  const { onClose, open, rowData, ...rest } = props;
  const { createEvents, mode, updateEvents } = useCalendar();
  const [dataForm, setDataForm] = useState<EventsData>({} as EventsData);
  const [disabledDate, setDisabledDate] = useState(false);
  const [check] = useState(false);

  //const colors = ['#ffeb3c', '#ff9900', '#f44437', '#ea1e63', '#9c26b0', '#3f51b5', '', '#009788', '#4baf4f', '#7e5d4e'];

  const handleChange = useCallback(
    (form: EventsData) => {
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
      start: rowData.date,
      end: rowData.date,
      backgroundColor: dataForm.backgroundColor ? dataForm.backgroundColor : '#1677ff',
      allDay: dataForm.allDay ? dataForm.allDay : false
    });
  }, [setDataForm, rowData]);

  useEffect(() => {
    if (dataForm.allDay) {
      setDisabledDate(true);
    } else {
      setDisabledDate(false);
    }
  }, [dataForm.allDay, setDisabledDate]);

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

          <Form.Group controlId="start">
            <Form.ControlLabel>Ínicio</Form.ControlLabel>
            <CustomProvider locale={ptBR}>
              <Form.Control
                name="start"
                accepter={DatePicker}
                format="dd/MM/yyy - HH:mm"
                value={moment(dataForm.start, 'YYYY-MM-DD - HH:mm').toDate()}
                disabled={disabledDate}
              />
            </CustomProvider>
          </Form.Group>

          <Form.Group controlId="end">
            <Form.ControlLabel>Término</Form.ControlLabel>
            <Stack spacing={6}>
              <CustomProvider locale={ptBR}>
                <Form.Control
                  name="end"
                  accepter={DatePicker}
                  format="dd/MM/yyy - HH:mm"
                  value={moment(dataForm.end, 'YYYY-MM-DD - HH:mm').toDate()}
                  disabled={disabledDate}
                />
              </CustomProvider>
            </Stack>
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
          <Form.Group controlId="backgroundColor">
            <Form.ControlLabel>Etiquetas</Form.ControlLabel>
            <Form.Control
              name="backgroundColor"
              accepter={ColorPicker}
              defaultValue="#1677ff"
              onChange={(e) =>
                setDataForm((prevState: EventsData) => ({
                  ...prevState,
                  backgroundColor: e.hex
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>{mode === 'create' ? 'Adicionar' : 'Editar'}</Button>
        <Button onClick={onClose} appearance="primary" color="red">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
