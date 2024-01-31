import React,{useContext, useEffect} from "react";
import RefContext from "Utilities/refContext";
import Barchart from "../../components/barchart/barchart";
import {  useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./barchart.css"

const BarChartPage=()=>{
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
    <div className="chart">
      <div className="barchart">
        {/* <div className="hover">Bar chart</div> */}
        <div className="bar-plot">
          <div className="barchart-title">Profit & Sales</div>
          {(excelData!==null&&excelData!==undefined)&&<Barchart  excelData={excelData} />}
        </div>
      </div>
    </div>
  )
}
export default BarChartPage;