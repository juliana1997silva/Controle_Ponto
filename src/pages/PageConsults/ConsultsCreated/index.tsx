import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Form, Panel } from 'rsuite';
import { useReleasePoint } from '../../PageRelease/hooks/hookReleasePoint';
import Consults from '../Consults';
import { TitlePage } from '../Consults/styles';

const ConsultsCreated: React.FC = () => {
  const { dataListUsers, listUsers } = useReleasePoint();
  const [showList, setShowList] = useState(false);

  const autoCompleteData = Object.values(dataListUsers || []).map((item) => {
    return item.name;
  });

  useEffect(() => {
    listUsers();
  }, [listUsers]);

  if (showList) {
    return <Consults />;
  }
  return (
    <Panel header={<TitlePage className="title">Criar Consultas</TitlePage>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          paddingRight: 20
        }}
      >
        <Button appearance="primary" onClick={() => setShowList(true)} style={{ backgroundColor: 'red', width: 120 }}>
          Voltar
        </Button>
      </div>

      <Form layout="horizontal">
        <Form.Group>
          <Form.ControlLabel>Consulta</Form.ControlLabel>
          <Form.Control name="consults" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Usuário</Form.ControlLabel>
          <Form.Control name="user" accepter={AutoComplete} data={[autoCompleteData]} />
        </Form.Group>
      </Form>
    </Panel>
  );
};

export default ConsultsCreated;
