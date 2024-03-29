import React, { useCallback, useState } from 'react';
import { Button, Drawer, Form, Table } from 'rsuite';
import { consultsData, useCheckPoint } from '../../hooks/hookCheckPoint';

const Consult: React.FC = () => {
  const { setDataModal, dataModal, openModal, setOpenModal } = useCheckPoint();
  const { Column, HeaderCell, Cell } = Table;
  const [consults, setConsults] = useState<consultsData[]>([]);
  const [consultData, setConsultData] = useState<consultsData>({} as consultsData);
  const handleChangeConsult = useCallback(
    (form: consultsData) => {
      setConsultData(form);
    },
    [setConsultData]
  );

  /* const handleSubmitConsult = useCallback(() => {
    if (
      consultData?.consult !== undefined &&
      consultData?.description !== undefined
    ) {
      consults.push({
        consult: consultData.consult,
        description: consultData.description,
      });

      setDataModal({
        ...dataModal,
        activities: consults,
      });
    } else {
      toast.error("Preencha os campos necessarios para anexar a consulta");
    }

    setConsultData({
      consult: "",
      description: "",
    });
  }, [consultData, dataModal, setDataModal, setConsultData, consults]);
 */

  return (
    <>
      <Drawer
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setConsults([]);
        }}
      >
        <Drawer.Header>
          <Drawer.Title>Adicionar Consulta</Drawer.Title>
          <Drawer.Actions>
            <Button
              onClick={() => {
                setOpenModal(false);
                setConsults([]);
              }}
              appearance="primary"
            >
              Confirmar
            </Button>
            <Button
              onClick={() => {
                setOpenModal(false);
                setConsults([]);
              }}
            >
              Cancelar
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <Form onChange={handleChangeConsult}>
            <Form.Group>
              <Form.ControlLabel>Data</Form.ControlLabel>
              <Form.Control name="date" defaultValue={dataModal.date} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Consulta</Form.ControlLabel>
              <Form.Control name="consult" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Descrição</Form.ControlLabel>
              <Form.Control name="description" />
            </Form.Group>
            <Form.Group>
              <Button
                appearance="primary"
                color="green"
                //onClick={handleSubmitConsult}
              >
                Adicionar
              </Button>
            </Form.Group>
          </Form>

          {/* {dataModal.activities && (
            <Table data={dataModal.activities}>
              <Column>
                <HeaderCell>Consulta</HeaderCell>
                <Cell dataKey="consult" />
              </Column>
              <Column>
                <HeaderCell>Descrição</HeaderCell>
                <Cell dataKey="description" />
              </Column>
            </Table>
          )} */}
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Consult;
