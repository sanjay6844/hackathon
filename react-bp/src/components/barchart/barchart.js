/* eslint-disable no-unused-vars */
import React ,{useState,useEffect,useContext} from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import "./barchart.css"
import RefContext from "Utilities/refContext";


import Chart from "react-apexcharts";
import { green } from "@mui/material/colors";

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
  const xAxis = barData?.map((data)=>data["Product Name"])
  let profit =[]
  let loss = []
  let salesAmount = []
  let cost = []
  barData?.map((data)=>{
    if(data["P/L"]>0){
      profit.push(data["P/L"])
      loss.push(null)
    }
    else{
      loss.push(data["P/L"]*-1)
      profit.push(null)
    }
    
    salesAmount.push(data["Sales Amount"])
    cost.push(data["Cost"])
  })
  const values = {
    optionsMixedChart: {
      // colors: ["green", "blue","yellow","red"],
      colors: ["#0D9276", "#0B60B0", "#FEB019","#F28585"],
      chart: {
        id: "basic-bar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      stroke: {
        width: [0, 0, 0],
      },
      xaxis: {
        categories: xAxis,
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        fillOpacity: 0,
        strokeOpacity: 0,
        hover: {
          size: 8,
        },
      },
      yaxis: {
        tickAmount: 5,
      },
    },
    seriesMixedChart: [
      {
        name: "Profit",
        type: "column",
        data: profit,
      },
      {
        name: "Cost",
        type: "column",
        data: cost,
      },
      {
        name: "Sales Amount",
        type: "column",
        data: salesAmount,
      },
      {
        name: "Loss",
        type: "column",
        data: loss,
      },
    ],
  };

  return (
    <div className="bar-chart-container">
      <Chart
        className = "bar-chart"
        options={values.optionsMixedChart}
        series={values.seriesMixedChart}
        width="95%"
        height="610px"
      />
    </div>
  );


}

export default Barchart