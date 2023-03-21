import { mdiAlarm, mdiFileDocumentOutline } from "@mdi/js";
import React from "react";
import Card from "../components/Card";
import CardCheckPoint from "../components/CardCheckPoint";
import CardConsults from "../components/CardConsults";
import { Container, ContainerGlobal } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <>
      <ContainerGlobal>
        <Card
          color={"green"}
          key="1"
          icon={mdiAlarm}
          graphic={false}
          title="02:58"
          subtitle="BANCO DE HORAS"
        />
        <Card
          color={"#4682B4"}
          key="2"
          icon={mdiFileDocumentOutline}
          graphic={false}
          title="57"
          subtitle="CONSULTAS ATENDIDAS"
        />
      </ContainerGlobal>
      <Container>
        <CardConsults />
        <CardCheckPoint />
      </Container>
    </>
  );
};

export default Dashboard;