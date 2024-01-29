import React,{useContext, useEffect,useState} from "react";
import "./chart.css"
import RefContext from "Utilities/refContext";
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const ChartPage=()=>{
  const ctx = useContext(RefContext);
  const { store,actions } = ctx;
  const { excelData } = store;
  const { getReloadData} = actions;
  const [cookies,setCookies] = useCookies(["user"])
  const navigateTo = useNavigate()
  useEffect(()=>{
    if(!cookies.user){
      navigateTo("/signin")
    }
    getReloadData()
  },[])

  

  return(

    <div className="charts">
      <div className="piechart">
        <div className="hover">Pie chart</div>
        <div className="plots">
          {(excelData!==null&&excelData!==undefined)&&<Piechart  excelData={excelData} />}
        </div>
      </div>
      <div className="barchart">
        <div className="hover">Bar chart</div>
        <div className="plots">
          {(excelData!==null&&excelData!==undefined)&&<Barchart  excelData={excelData} />}
        </div>
      </div>
    </div>
  )
}
export default ChartPage;