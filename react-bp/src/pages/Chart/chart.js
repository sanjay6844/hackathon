import React,{useContext, useEffect} from "react";
import "./chart.css"
import RefContext from "Utilities/refContext";
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
import {  useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChartPage=()=>{
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

  

  return(

    <div className="charts">
      <div className="piechart">
        <div className="hover">Pie chart</div>
        <div className="plots">
          <div>Asset Allocation</div>
          {(excelData!==null&&excelData!==undefined)&&<Piechart  excelData={excelData} />}
        </div>
      </div>
      <div className="barchart">
        <div className="hover">Bar chart</div>
        <div className="plots">
          <div>Profit&Sales</div>
          {(excelData!==null&&excelData!==undefined)&&<Barchart  excelData={excelData} />}
        </div>
      </div>
    </div>
  )
}
export default ChartPage;