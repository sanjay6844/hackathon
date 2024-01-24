import React from "react";
import "./piechart.css"
import { PieChart } from '@mui/x-charts/PieChart';

const Piechart=()=>{
    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
      ];
    return(
         <PieChart
        series={[
          {
            data,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
          },
        ]}
        height={200}
      />
    )
}
export default Piechart;