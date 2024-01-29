import React, { useEffect,useContext,useState } from "react";
import "./piechart.css"
import RefContext from "Utilities/refContext";
import { PieChart } from "@mui/x-charts/PieChart";



const Piechart=({excelData})=>{
  
  const ctx = useContext(RefContext);
  const { store } = ctx;



  const [pieData,setPieData] = useState([])

 
  useEffect(()=>{
    setPieData(excelData[0].Asset_allocation)
    ,[store]})

  return(
    pieData!==null&&pieData!==undefined&&
    <PieChart
      series={[
        {
          data:pieData.map(item=>({value:item?.["Shares ( % )"],label:item?.Companies})),
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