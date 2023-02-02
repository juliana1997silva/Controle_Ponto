import { Panel } from "rsuite";
import ChartBar from "./ChartBar";
import ChartLine from "./ChartLine";

const Home: React.FC = () => {
  const dataBar: [category: string, ...values: number[]][] | undefined = [
    ["31/01", 8, 2],
    ["30/01", 8, 1],
    ["01/02", 8, 5],
    ["02/02", 8, 2.5],
    ["03/02", 8, 0],
  ];

  const dataConsult: [category: string, ...values: number[]][] | undefined = [
    ["31/01", 5],
    ["30/01", 4],
    ["01/02", 9],
    ["02/02", 15],
    ["03/02", 10],
  ];
  return (
    <Panel header={<h3 className="title">Dashboard</h3>}>
      <ChartBar
        name="Exemplo BarChart"
        data={dataBar}
        bars1={{
          name: "Expediente",
          color: "#2485C1",
        }}
        bars2={{
          name: "Banco de Horas",
          color: "#32A4D4",
        }}
      />
      <ChartLine
        name="Exemplo - Quantidade Consulta por dia"
        data={dataConsult}
      />
    </Panel>
  );
};

export default Home;
