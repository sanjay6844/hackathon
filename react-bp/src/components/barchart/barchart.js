/* eslint-disable no-unused-vars */
import React ,{useState,useEffect,useContext} from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import "./barchart.css"
import RefContext from "Utilities/refContext";


import Chart from "react-apexcharts";

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
  let profitLoss =[]
  let salesAmount = []
  let cost = []
  barData?.map((data)=>{
    profitLoss.push(data["P/L"])
    salesAmount.push(data["Sales Amount"])
    cost.push(data["Cost"])
  })
  console.log(profitLoss)
  const values = {
    optionsMixedChart: {
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
        width: [4, 0, 0],
      },
      xaxis: {
        categories: xAxis,
      },
      markers: {
        size: 6,
        strokeWidth: 3,
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
        name: "P/L",
        type: "column",
        data: profitLoss,
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
    ],
  };

  return (
    <div className="bar-chart-container">
      <Chart
        className = "bar-chart"
        options={values.optionsMixedChart}
        series={values.seriesMixedChart}
        // type="line"
        width="95%"
        height="610px"
      />
    </div>
  );


}

export default Barchart