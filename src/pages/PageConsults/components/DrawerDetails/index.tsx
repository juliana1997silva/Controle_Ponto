import React from 'react';
import { Button, Drawer } from 'rsuite';

interface dataDrawer {
  open: boolean;
  onClose: () => void;
  onClickCancel: () => void;
}

const DrawerDetails: React.FC<dataDrawer> = ({ open, onClose, onClickCancel }) => {
  return (
    <>
      <Drawer open={open} onClose={onClose}>
        <Drawer.Header>
          <Drawer.Title>Detalhes da Consulta</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={onClickCancel} color="red" appearance="primary">
              Fechar
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <span>DETALHES DA CONSULTA</span>
        </Drawer.Body>
      </Drawer>
    </>
  );
};
export default DrawerDetails;
