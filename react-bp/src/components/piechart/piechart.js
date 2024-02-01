/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import React, { useEffect,useContext,useState } from "react";
import "./piechart.css"
import RefContext from "Utilities/refContext";
import { PieChart } from "@mui/x-charts/PieChart";



const Piechart=({excelData})=>{
  
  const ctx = useContext(RefContext);
  const { store } = ctx;
  useEffect(()=>{
    if(store?.excelData){
      console.log(excelData,"excelData in store")
    }
  },[store])


  const [pieData,setPieData] = useState(null)

 
  useEffect(()=>{
    if(excelData[0]===undefined){
      return 
    }
    setPieData(excelData[0]["Asset_allocation"])
    ,[]})

  // useEffect(()=>{Shares ( % )
  //   if(dataset===null){
  //     return
  //   }
  //   console.log("dataset",dataset[0].Asset_allocation)
  //   setPieData(dataset[0].Asset_allocation)
  // })

  
  // if(pieData===null)
  const[colours,setColours]=useState([])

  const generateItemColors = () => {
    // eslint-disable-next-line no-unused-vars
    pieData?.forEach((item, index) => {
      // const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      const color = `#${(Math.floor(Math.random() * 128) + 128).toString(16)}${(Math.floor(Math.random() * 128) + 128).toString(16)}${(Math.floor(Math.random() * 128) + 128).toString(16)}`;


      // Check if the color has a valid format, otherwise, generate a new one
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        setColours(current => [...current, color]);
      } 
      
    });
  };
  
  useEffect(() => {
    generateItemColors();
  }, [pieData]);
  return(
    pieData!==null&&pieData!==undefined&&
    <PieChart
      
      series={[
        {
          // eslint-disable-next-line no-unused-vars
          data:pieData.map((item,index)=>({value:item?.["Shares ( % )"],label:item?.Companies,color:colours[index]})),
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









/*
 *
 * Highcarts Pie Chart
 *
 */

// import React, { useState, useEffect, forwardRef, memo,useContext } from "react";
// import styled from "styled-components";
// import { renderToString } from "react-dom/server";
// import RefContext from "Utilities/refContext";
// //Highcharts library
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsExporting from "highcharts/modules/exporting";
// import HighchartsOfflineExporting from "highcharts/modules/offline-exporting";
// import { sum } from "lodash";


// if (typeof Highcharts === "object") {
//   HighchartsExporting(Highcharts);
//   HighchartsOfflineExporting(Highcharts);
// }

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   & .highcharts-legend-item path {
//     display: none;
//   }
//   & .highcharts-legend-item rect {
//     display: none;
//   }
//   //custom legend styles
//   .legent-line-wrapper {
//     font-weight: 400;
//     font-size: 14px;
//     line-height: 20px;
//     letter-spacing: 0.01em;
//     color: #666667;
//     display: flex;
//     align-items: center;
//     column-gap: 4px;
//     .dot {
//       width: 8px;
//       height: 8px;
//       display: inline-block;
//       border-radius: 50%;
//     }
//     .legent-text {
//       text-transform: capitalize;
//     }
//     .legend-percentage {
//       color: #807f81;
//       margin-left: 6px;
//     }
//   }
//   //tooltip border removal
//   .highcharts-root .highcharts-tooltip path {
//     fill: none;
//     d: none;
//   }
//   .highcharts-tooltip > span {
//     background: linear-gradient(0deg, #ffffff, #ffffff), #807f81;
//     box-shadow: 0px 10px 18px rgba(51, 51, 52, 0.15),
//       0px 0px 1px rgba(51, 51, 52, 0.31);
//     border-radius: 8px;
//     padding: 8px;
//   }
//   .pie-graph-tooltip-wrapper {
//     .main {
//       display: flex;
//       align-items: center;
//       column-gap: 4px;
//       height: 26px;
//     }
//     .dot {
//       width: 5px;
//       height: 5px;
//       display: inline-block;
//       border-radius: 50%;
//     }
//     .sessions-count {
//       color: #807f81;
//       .value {
//         color: #222222;
//         font-weight: 500;
//       }
//     }
//     .status-tag {
//       display: flex;
//       align-items: center;
//       column-gap: 4px;
//       height: 26px;
//       .badge {
//         height: inherit;
//         background: linear-gradient(
//             0deg,
//             rgba(255, 255, 255, 0.8),
//             rgba(255, 255, 255, 0.8)
//           ),
//           #54d62c;
//         border-radius: 50px;
//         padding: 4px 10px 4px 8px;
//       }
//       span {
//         color: #807f81;
//         font-weight: 500;
//         font-size: 10px;
//         letter-spacing: 0.01em;
//       }
//     }
//   }
// `;

// const makeChartOptions = (props, ref) => {
//   let config = { ...props.defaultConfig };
//   if (props.config) {
//     config = { ...props.defaultConfig, ...props.config };
//   }
//   const { style, colorPalette, chartType, title, subtitle, data } = config;

//   const options = {
//     credits: {
//       enabled: false //disabled the credits of highcharts
//     },
//     chart: {
//       type: chartType,
//       style: style
//     },
//     title: {
//       text: title,
//       align: "left"
//       // x: 70
//     },
//     subtitle: {
//       text: subtitle,
//       align: "left"
//       // x: 70
//     },
//     plotOptions: {
//       pie: {
//         borderWidth: 1,
//         allowPointSelect: true,
//         cursor: "pointer",
//         colors: colorPalette,
//         point: {
//           events: {
//             legendItemClick: function (e) {
//               const chart = this.series.chart;

//               this.series.points.forEach((point) => {
//                 if (point.name === this.name) {
//                   point.graphic.attr({
//                     opacity: 1
//                   });
//                 }
//                 if (point.name !== this.name) {
//                   point.graphic.attr({
//                     opacity: 0.2
//                   });
//                 }
//               });

//               chart.tooltip.refresh(this);
//               e.preventDefault();
//             },
//             mouseOver: function () {
//               const chart = this.series.chart;

//               this.series.points.forEach((point) => {
//                 if (point.name === this.name) {
//                   point.graphic.attr({
//                     opacity: 1
//                   });
//                 }
//                 if (point.name !== this.name) {
//                   point.graphic.attr({
//                     opacity: 0.2
//                   });
//                 }
//               });
//             },
//             mouseOut: function () {
//               const chart = this.series.chart;

//               this.series.points.forEach((point) => {
//                 point.graphic.attr({
//                   opacity: 1
//                 });
//               });
//             }
//           }
//         }
//       }
//     },
//     series: [
//       {
//         type: "pie",
//         name: "exports",
//         showInLegend: true,
//         data: data,
//         colorByPoint: true, //if it is true then only above colors arr will take effect
//         dataLabels: { enabled: false }, //can be used to show data labled for pie
//         innerSize: "0%",
//         states: {
//           inactive: {
//             enabled: false
//           }
//         }
//       }
//     ],
//     legend: {
//       layout: "vertical",
//       align: "right",
//       verticalAlign: "middle",
//       // x: -20,
//       y: -10,
//       itemMarginTop: 5,
//       itemMarginBottom: 5,
//       shared: true,
//       useHTML: true,
//       // Label formatter function, we place the index of the datasets into the data-index attribute
//       labelFormatter: function () {
//         return renderToString(<CustomLegendFormatter this={this} />);
//       }
//     },
//     exporting: {
//       enabled: false //Default Export option of highcharts
//     },
//     tooltip: {
//       //To access x-axis value = point.x/series.name
//       //To access y-axis value = point.y
//       shared: true,
//       useHTML: true,
//       formatter: function (tooltip) {
//         return renderToString(<Tooltip this={this} />);
//       }
//     }
//   };
//   return options;
// };

// const CustomLegendFormatter = (props) => {
//   const that = props.this;
//   // console.table('this in legend : ', that);
//   const isLegendVisible = that.visible;
//   const disabledColor = "#E5E5E5";
//   // const total = sum(that?.series?.processedYData);
//   // const total = that.total;
//   // let percentage = ((that.y / total) * 100).toLocaleString(undefined, {
//   //   maximumFractionDigits: 2
//   // });

//   return (
//     <div className="legent-line-wrapper">
//       <span
//         className="dot"
//         style={{
//           backgroundColor: isLegendVisible ? that?.color : disabledColor
//         }}
//       ></span>
//       <span
//         data-index={that.index}
//         className="legent-text"
//         style={{ color: isLegendVisible ? "" : disabledColor }}
//       >
//         {that.name}
//         <span
//           className="legend-percentage"
//           style={{ color: isLegendVisible ? "" : disabledColor }}
//         >{`(${that.percentage.toLocaleString(undefined, {
//             maximumFractionDigits: 2
//           })}%)`}</span>
//       </span>
//     </div>
//   );
// };

// const Tooltip = (props) => {
//   const { x, y, point, series } = props.this;
//   return (
//     <div className="pie-graph-tooltip-wrapper">
//       <div className="main">
//         <span className="dot" style={{ backgroundColor: point?.color }}></span>
//         <span className="sessions-count">
//           {point?.name} <span className="value">{y}</span>
//         </span>
//       </div>
//     </div>
//   );
// };

// // eslint-disable-next-line react/display-name
// const PieChart = forwardRef((props, ref) => {
//   const [options, setOptions] = useState(makeChartOptions(props, ref));
  
//   const [pieDatas,setPieDatas] = useState(null);
//   const ctx = useContext(RefContext);
//   const { store } = ctx;
//   useEffect(()=>{
//     if(excelData[0]===undefined){
//       console.log("exceldata is undefined ")
//       return 
//     }

//     setPieDatas(excelData[0].Asset_allocation)
//     ,[store]})

  
//   useEffect(() => {}, [options]);

//   return (
//     <Wrapper className="pie-chart">
//       <HighchartsReact
//         highcharts={Highcharts}
//         ref={ref}
//         options={options}
//         containerProps={{ className: "chart-container" }}
//         allowChartUpdate={true}
//       />
//     </Wrapper>
//   );
// });

// PieChart.propTypes = {

// };



// PieChart.defaultProps={

//   defaultConfig: {
//     chartType: "pie",
//     name: "",
//     data: pieDatas.map((item)=>({value:item?.["Shares ( % )"],label:item?.Companies})),
//     title: undefined,
//     subtitle: undefined,
//     yAxisData: []
//   }
// };

// export default memo(PieChart);
