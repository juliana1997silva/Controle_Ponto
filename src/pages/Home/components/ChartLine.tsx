import { LineChart } from "@rsuite/charts";
import React from "react";

interface dataLinechart {
  name: string;
  data: [category: string, ...values: number[]][] | undefined;
  style?: React.CSSProperties | undefined;
}

const ChartLine: React.FC<dataLinechart> = ({ name, data, style }) => {
  return (
    <>
      <LineChart name={name} data={data} style={style} />
    </>
  );
};

export default ChartLine;
