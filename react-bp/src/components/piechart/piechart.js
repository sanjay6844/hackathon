import React from "react";
import "./piechart.css"
import { PieChart } from "@mui/x-charts/PieChart";

const Piechart=()=>{

  const data = [
    { id: 0, value: 10, label: "series A" },
    { id: 1, value: 15, label: "series B" },
    { id: 2, value: 20, label: "series C" },  
    { id: 3, value: 10, label: "series D" },
    { id: 4, value: 15, label: "series E" },
    { id: 5, value: 20, label: "series F" },
    { id: 6, value: 10, label: "series G" },
    { id: 7, value: 15, label: "series H" },
    { id: 8, value: 2, label: "series I" },
  ];
  return(
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          innerRadius: 0,
          outerRadius: 200,
          paddingAngle: 0,
          cornerRadius: 0,
        },
      ]}
      height={400}
      width={600}
    />
  )
}
export default Piechart;