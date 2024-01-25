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
    console.log(excelData[0].Asset_allocation,"inside data")
    setBarData(excelData[0])
    ,[store]})

  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Fev",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: "Dec",
    },
  ];
  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
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
  const valueFormatter = (value) => `${value}mm`;
  return(

    barData!=null&&undefined&&<BarChart
      dataset={barData}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "Product Id", label: "Product Id", valueFormatter },
        { dataKey: "Product Name", label: "Product Name", valueFormatter },
        { dataKey: "Sales Amount", label: "Sales Amount", valueFormatter },
        { dataKey: "Cost", label: "Cost", valueFormatter },
        { dataKey: "P/L", label: "P/L", valueFormatter },

      ]}
      {...chartSetting}
    />
   
  )
}

export default Barchart