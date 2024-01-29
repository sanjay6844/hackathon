import React, { useEffect,useContext,useState } from "react";
import "./piechart.css"
import RefContext from "Utilities/refContext";
import { PieChart } from "@mui/x-charts/PieChart";



const Piechart=({excelData})=>{
  
  const ctx = useContext(RefContext);
  const { store } = ctx;



  const [pieData,setPieData] = useState(null)

 
  useEffect(()=>{
    if(excelData[0]===undefined){
      console.log("exceldata is undefined ")
      return 
    }
    setPieData(excelData[0].Asset_allocation)
    ,[store]})
  // useEffect(()=>{
  //   if(pieData.Object.keys==="Shares ( % )")
  //     setSample("Share")
  // })
  // useEffect(()=>{
  //   setExiting(pieData.map((data,key)=>{return({id:key,value:data[sample],label:data.Companies})}))
  // },[pieData])
 

  // useEffect(()=>{Shares ( % )
  //   if(dataset===null){
  //     return
  //   }
  //   console.log("dataset",dataset[0].Asset_allocation)
  //   setPieData(dataset[0].Asset_allocation)
  // })

  
  // if(pieData===null)
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
          cx: 300,
          cy: 195,
        },
      ]}
      height={400}
      width={600}
    />

  )
}
export default Piechart;