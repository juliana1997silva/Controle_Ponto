import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, DatePicker, ModalProps, Stack, Checkbox } from 'rsuite';

interface EventModalProps extends ModalProps {
  onAddEvent: (event: React.MouseEvent) => void;
}

const EventModal = (props: EventModalProps) => {
  const { onClose, open, onAddEvent, ...rest } = props;
  const [todayTotal, setTodayTotal] = useState(false);

  return (
    <Modal open={open} onClose={onClose} backdrop="static" {...rest}>
      <Modal.Header>
        <Modal.Title>Adicionar Evento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid>
          <Form.Group controlId="name">
            <Form.ControlLabel>Nome</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.ControlLabel>Descrição</Form.ControlLabel>
            <Form.Control name="description" />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.ControlLabel>Local</Form.ControlLabel>
            <Form.Control name="location" />
          </Form.Group>
          <Form.Group controlId="start">
            <Form.ControlLabel>Horário</Form.ControlLabel>
            <Stack spacing={6}>
              <DatePicker
                format="HH:mm"
                block
                style={{ width: 200 }}
                placeholder="Ínicio"
                locale={{ hours: 'Horas', minutes: 'Minutos' }}
                disabled={todayTotal}
              />
              <DatePicker
                format="HH:mm"
                block
                style={{ width: 200 }}
                placeholder="Término"
                locale={{ hours: 'Horas', minutes: 'Minutos' }}
                disabled={todayTotal}
              />
              <Checkbox onChange={(e: any, v: any) => setTodayTotal(v)}>Dia Todo</Checkbox>
            </Stack>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddEvent} appearance="primary">
          Adicionar
        </Button>
        <Button onClick={onClose} appearance="primary" color="red" >
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
