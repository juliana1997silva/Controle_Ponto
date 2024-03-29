import { mdiAlarm, mdiFileDocumentOutline } from '@mdi/js';
import React, { useEffect, useState } from 'react';
import { Animation } from 'rsuite';
import Card from '../components/Card';
import CardCheckPoint from '../components/CardCheckPoint';
import CardConsults from '../components/CardConsults';
import './animation.css';
import { Container, ContainerGlobal, ContainerGrafic } from './styles';

const Dashboard: React.FC = () => {
  const [show, setShow] = useState(false);

  const Cards = React.forwardRef(({ ...props }, ref: any) => (
    <div
      {...props}
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Card color={'#1976D2'} key="1" icon={mdiAlarm} graphic={false} title="02:58" subtitle="BANCO DE HORAS" />
      <Card color={'#2386d6'} key="2" icon={mdiFileDocumentOutline} graphic={false} title="57" subtitle="CONSULTAS ATENDIDAS" />
    </div>
  ));

  const ConsultsGraphic = React.forwardRef(({ ...props }, ref: any) => (
    <div {...props} ref={ref}>
      <CardConsults />
    </div>
  ));

  const GraphicCheckPoint = React.forwardRef(({ ...props }, ref: any) => (
    <div {...props} ref={ref}>
      <CardCheckPoint />
    </div>
  ));

  useEffect(() => {
    setShow(true);
  }, [setShow]);

  return (
    <>
      <ContainerGlobal>
        {/* <Button onClick={onChange}>CLique AQUI</Button> */}
        <Animation.Transition
          exitedClassName="custom-exited"
          exitingClassName="custom-exiting"
          enteredClassName="custom-entered"
          enteringClassName="custom-entering"
          in={show}
        >
          {(props, ref) => <Cards {...props} ref={ref} />}
        </Animation.Transition>
      </ContainerGlobal>
      <Container>
        <ContainerGrafic>
          <Animation.Transition
            exitedClassName="custom-exited"
            exitingClassName="custom-exiting"
            enteredClassName="custom-entered"
            enteringClassName="custom-entering"
            in={show}
          >
            {(props, ref) => <ConsultsGraphic {...props} ref={ref} />}
          </Animation.Transition>
        </ContainerGrafic>

        <ContainerGrafic>
          <Animation.Transition
            exitedClassName="custom-exited"
            exitingClassName="custom-exiting"
            enteredClassName="custom-entered"
            enteringClassName="custom-entering"
            in={show}
          >
            {(props, ref) => <GraphicCheckPoint {...props} ref={ref} />}
          </Animation.Transition>
        </ContainerGrafic>
      </Container>
    </>
  );
};

export default Dashboard;
