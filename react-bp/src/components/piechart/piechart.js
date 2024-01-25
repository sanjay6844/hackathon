import React,{useContext,useEffect, useState} from "react";
import "./piechart.css"
import { PieChart } from "@mui/x-charts/PieChart";
import RefContext from "Utilities/refContext";


const Piechart=({excelData})=>{
  const [show,setShow]=useState([]);
  const ctx = useContext(RefContext);
  const { store} = ctx;
  useEffect(()=>{
    console.log("sjdfljk")
  },[])
  useEffect(()=>{
    console.log(excelData,"heidjhdeu")
    setShow(excelData.Asset_allocation.map((data,key)=>{return({id:key,value:11,label:data.compaies})}))
    console.log("hei")
  },[store])

  const data = [
    show
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