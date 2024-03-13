import React, { useState } from 'react';
import { Button, Panel } from 'rsuite';
import { TitlePage } from './styles';
import ConsultsCreated from '../ConsultsCreated';

const Consults: React.FC = () => {
    const [showCreated, setShowCreated] = useState(false);

    if (showCreated){
        return <ConsultsCreated />
    }
      return (
        <Panel header={<TitlePage className="title">Consultas</TitlePage>}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button appearance="primary" onClick={() => setShowCreated(true)} style={{ backgroundColor: '#1976D2', width: 120 }}>
              Novo
            </Button>
          </div>
        </Panel>
      );
};

export default Consults;
