import React,{useContext, useEffect} from "react";
import "./chart.css"
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
import RefContext from "Utilities/refContext";

const ChartPage=()=>{
  const ctx = useContext(RefContext);
  const { store,actions } = ctx;
  const { excelData } = store;
  const { getReloadData} = actions;
  useEffect(()=>{
    getReloadData()
    console.log("datain chart",store)
  },[])
  return(
    <div className="charts">
      <div className="piechart">
        <div className="hover">Piechart</div>
        <div className="plots"><Piechart excelData={excelData} /></div>
      </div>
      <div className="barchart">
        <div className="hover">Barchart</div>
        <div className="plots"><Barchart excelData={excelData}/></div>
      </div>
    </div>
  )
}
export default ChartPage;