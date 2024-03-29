import React from "react";
import { Table } from "rsuite";
import {
  Circle,
  Container,
  ContainerStatus,
  Divider,
  DividerFichas,
  Status,
  Title,
} from "./styles";

const CardCheckPoint: React.FC = () => {
  const { Column, HeaderCell, Cell } = Table;
  const data = [
    {
      date: "19/Mar/2023",
      status: "Aprovada",
    },
    {
      date: "20/Mar/2023",
      status: "Aprovada",
    },
    {
      date: "21/Mar/2023",
      status: "Reprovada",
    },
    {
      date: "22/Mar/2023",
      status: "Aprovada",
    },
    {
      date: "23/Mar/2023",
      status: "Reprovada",
    },
    {
      date: "24/Mar/2023",
      status: "Aprovada",
    },
    {
      date: "25/Mar/2023",
      status: "Aprovada",
    },
  ];
  return (
    <Container>
      <Divider />
      <Title>Últimas Fichas</Title>
      <DividerFichas />
      <Table data={data} autoHeight>
        <Column width={270} align="left">
          <HeaderCell>Data</HeaderCell>
          <Cell dataKey="date" />
        </Column>
        <Column width={270} align="left">
          <HeaderCell>Status</HeaderCell>
          <Cell>
            {(rowData: any) => {
              switch (rowData.status) {
                case "Aprovada":
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: "green",
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );

                case "Reprovada":
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: "red",
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );

                default:
                  return (
                    <ContainerStatus>
                      <Circle
                        style={{
                          backgroundColor: "yellow",
                        }}
                      />
                      <Status>{rowData.status}</Status>
                    </ContainerStatus>
                  );
              }
            }}
          </Cell>
        </Column>
      </Table>
    </Container>
  );
};

export default CardCheckPoint;
