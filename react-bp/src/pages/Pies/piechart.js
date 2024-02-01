/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// /* eslint-disable no-undef */
import React, { useEffect,useContext,useState } from "react";
import {  useCookies } from "react-cookie";
import "./style.css"
import RefContext from "Utilities/refContext";
import { useNavigate } from "react-router-dom";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
  Legend,
  SmallValuesGrouping
} from "devextreme-react/pie-chart";


const Pie=()=>{
  
  const ctx = useContext(RefContext);
  const { store,actions } = ctx;
  const { excelData } = store;
  const { getReloadData} = actions;
  const [cookies] = useCookies(["user"])
  const navigateTo = useNavigate()
  useEffect(()=>{
    if(!cookies.user){
      navigateTo("/signin")
    }
    getReloadData()
  },[])
  useEffect(()=>{
    if(store?.excelData){
      console.log(excelData,"excelData in store")
    }
  },[store])


  const [pieData,setPieData] = useState(null)

 
  useEffect(()=>{
    console.log(excelData,"exceldata")
    if(excelData===undefined){
      return
    }
    if(excelData[0]===undefined){
      console.log("exceldata is undefined ")
      return 
    }
    setPieData(excelData[0].Asset_allocation)
    ,[store]})

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
  const pointClickHandler=(e)=> {
    toggleVisibility(e.target);
  }
  const legendClickHandler=(e)=>{
    let arg = e.target;
    let item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    toggleVisibility(item);
  }
  const toggleVisibility=(item)=>{
    item.isVisible() ? item.hide() : item.show();
  }
  useEffect(() => {
    generateItemColors();
  }, [pieData]);
  return(
    pieData!==null&&pieData!==undefined&&
    <div className="show">
      <PieChart
        id={"pie"}
        dataSource={pieData}
        title={"Asset Allocation"}
        palette={"violet"}
        paletteExtensionMode={"blend"}
        resolveLabelOverlapping={"shift"}
        onPointClick={pointClickHandler}
        onLegendClick={legendClickHandler}
      >
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          columnCount={5} />
        <SmallValuesGrouping threshold={4.5} mode="smallValueThreshold" />
        <Series argumentField={"Companies"} valueField={"Shares ( % )"}>
          <Label visible={true}  >
            <Connector visible={true} width={0.5} />
          </Label>
        </Series>
        <Size width={1100} height={750} />
        <Export enabled={true} />
      </PieChart>
    </div>

  )
}
export default Pie;









