import React ,{useContext,useState,useEffect} from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import RefContext from "Utilities/refContext";

const Barchart = ({excelData})=>{

  const ctx = useContext(RefContext);
  const { store } = ctx;
  // const { excelData } = store;

  const [barData,setBarData] = useState(null)
  useEffect(()=>{
    console.log(excelData[0])
    // setDataset(excelData)
    if(excelData[0]===undefined){
      return 
    }
    console.log(excelData[0]["Sales&Profit"],"inside data")
    setBarData(excelData[0]["Sales&Profit"])
    ,[]})

  const chartSetting = {
    yAxis: [
      {
        label: "",
      },
    ],
    width: 600,
    height: 400,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };
  const valueFormatter = (value) => `${value}Rs`;
  return(

    barData!==null&&barData!==undefined&&<BarChart
      dataset={barData}
      xAxis={[{ scaleType: "band", dataKey: "Product Name",label:"Product Name" }]}
      series={[
        { dataKey: "Sales Amount", label: "Sales Amount", valueFormatter },
        { dataKey: "Cost", label: "Cost", valueFormatter },
        { dataKey: "P/L", label: "P/L", valueFormatter },
      ]}
      {...chartSetting}
    />
   
  )
}

export default Barchart