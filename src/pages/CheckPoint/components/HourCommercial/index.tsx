import React, { useCallback } from "react";
import { toast } from "react-toastify";
import { Button, Drawer, Form, Table } from "rsuite";
import { dataHourCommercial, useCheckPoint } from "../../hooks/hookCheckPoint";

const HourCommercial: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const {
    setCommercialData,
    commercialData,
    commercial,
    setDataModal,
    dataModal,
    openCommercial,
    setOpenCommercial,
    setCommercial,
  } = useCheckPoint();
  const handleChangeCommercial = useCallback(
    (form: dataHourCommercial) => {
      setCommercialData(form);
    },
    [setCommercialData]
  );

  /* const handleSubmitCommercial = useCallback(() => {
    if (
      commercialData.entry_time_commercial !== undefined &&
      commercialData.out_time_commercial !== undefined
    ) {
      commercial.push({
        entry_time_commercial: commercialData.entry_time_commercial,
        lunch_entry_time_commercial: commercialData.lunch_entry_time_commercial,
        lunch_out_time_commercial: commercialData.lunch_out_time_commercial,
        out_time_commercial: commercialData.out_time_commercial,
      });

      setDataModal({
        ...dataModal,
        hour_commercial: commercial,
      });
    } else {
      toast.error("Preencha os campos necessarios para anexar a consulta");
    }

    setCommercialData({
      entry_time_commercial: "",
      lunch_entry_time_commercial: "",
      lunch_out_time_commercial: "",
      out_time_commercial: "",
    });
  }, [commercialData, commercial, setDataModal, setCommercialData, dataModal]); */

  return (
    <Drawer
      open={openCommercial}
      onClose={() => {
        setOpenCommercial(false);
        setCommercial([]);
      }}
    >
      <Drawer.Header>
        <Drawer.Title>Adicionar Horário Não Comercial</Drawer.Title>
        <Drawer.Actions>
          <Button
            onClick={() => {
              setOpenCommercial(false);
              setCommercial([]);
            }}
            appearance="primary"
          >
            Confirmar
          </Button>
          <Button
            onClick={() => {
              setOpenCommercial(false);
              setCommercial([]);
            }}
          >
            Cancelar
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <Form onChange={handleChangeCommercial}>
          <Form.Group>
            <Form.ControlLabel>Data</Form.ControlLabel>
            <Form.Control name="date" defaultValue={dataModal.date} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Entrada</Form.ControlLabel>
            <Form.Control name="entry_time_commercial" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Inicio Pausa</Form.ControlLabel>
            <Form.Control name="lunch_entry_time_commercial" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Termino Pausa</Form.ControlLabel>
            <Form.Control name="lunch_out_time_commercial" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Saída</Form.ControlLabel>
            <Form.Control name="out_time_commercial" />
          </Form.Group>
          <Form.Group>
            <Button
              appearance="primary"
              color="green"
             // onClick={handleSubmitCommercial}
            >
              Adicionar
            </Button>
          </Form.Group>
        </Form>

        {dataModal.hour_commercial && (
          <Table data={dataModal.hour_commercial}>
            <Column>
              <HeaderCell>Entrada</HeaderCell>
              <Cell dataKey="entry_time_commercial" />
            </Column>
            <Column>
              <HeaderCell>Inicio Pausa</HeaderCell>
              <Cell dataKey="lunch_entry_time_commercial" />
            </Column>
            <Column>
              <HeaderCell>Termino Pausa</HeaderCell>
              <Cell dataKey="lunch_out_time_commercial" />
            </Column>
            <Column>
              <HeaderCell>Saída</HeaderCell>
              <Cell dataKey="out_time_commercial" />
            </Column>
          </Table>
        )}
      </Drawer.Body>
    </Drawer>
  );
};

export default HourCommercial;
