import React, { useEffect,useContext,useState } from "react";
import "./piechart.css"
import RefContext from "Utilities/refContext";
import { PieChart } from "@mui/x-charts/PieChart";


const Piechart=({excelData})=>{
  // const { excelData } = store;
  const ctx = useContext(RefContext);
  const { store } = ctx;
  // const { excelData } = store;
  const data = [
    {"id":0,  
      "label": "Britannia Industries Ltd",
      "value": 4
    },
    {"id":1,  
      "label": "Cipla Ltd",
      "value": 68
    },
    {"id":2,  
      "lable": "Eicher Motors Ltd",
      "value": 90
    },
    {"id":3,  
      "label": "Nestle India Ltd",
      "value": 73
    },
    {"id":4,  
      "label": "Grasim Industries Ltd",
      "value": 90
    },
  ];

  const [pieData,setPieData] = useState(null)
  useEffect(()=>{
    if(pieData!==null){
      return
    }
    // console.log(excelData[0])
    // setDataset(excelData)
    // console.log(excelData[0].Asset_allocation,"inside data")
    // console.log("format",excelData[0].Asset_allocation.map((data,key)=>{return({id:key,value:10,label:data.Companies})}))
    setPieData(excelData[0].Asset_allocation.map((data,key)=>{return({id:key,value:10,label:data.Companies})}))
    ,[store]})

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
          data:pieData,
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