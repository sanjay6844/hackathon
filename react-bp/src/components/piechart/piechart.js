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







