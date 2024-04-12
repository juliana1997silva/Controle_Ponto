import { BarChart, Bars } from "@rsuite/charts";
import React from "react";

interface dataBarchart {
  name: string;
  data?: [category: string, ...values: number[]][] | undefined;
  bars1?: {
    name: string;
    color: string;
  };
  bars2?: {
    name: string;
    color: string;
  };
  style?: React.CSSProperties | undefined;
}

const ChartBar: React.FC<dataBarchart> = ({
  name,
  data,
  bars1,
  bars2,
  style,
}) => {
  return (
    <>
      <BarChart name={name} data={data} style={style}>
        <Bars name={bars1?.name} color={bars1?.color} stack />
        <Bars name={bars2?.name} color={bars2?.color} stack />
      </BarChart>
    </>
  );
};

export default ChartBar;
