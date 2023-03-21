import React from "react";
import Dashboard from "./Dashboard";

const Home: React.FC = () => {
  /* const { user } = useAuth();
  const [show, setShow] = useState(false);

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

  useEffect(() => {
    setShow(true);
  }); */

  return (
    <>
      {/* <Panel header={<TitlePage className="title">Dashboard</TitlePage>}>
      {/* <Animation.Bounce in={show}>
        <span>JULIANA TESTE</span>
      </Animation.Bounce> 
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
        style={{
          width: "80%",
        }}
      />
      <ChartLine
        name="Exemplo - Quantidade Consulta do Departamento"
        data={dataConsult}
        style={{
          width: "80%",
        }}
      />
    </Panel> */}
      <Dashboard />
    </>
  );
};

export default Home;
