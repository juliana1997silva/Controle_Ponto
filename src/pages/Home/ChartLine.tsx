import { LineChart } from "@rsuite/charts";
import React from "react";

interface dataLinechart {
  name: string;
  data: [category: string, ...values: number[]][] | undefined;
}

const ChartLine: React.FC<dataLinechart> = ({ name, data }) => {
  return (
    <>
      <LineChart name={name} data={data} />
    </>
  );
};

export default ChartLine;
