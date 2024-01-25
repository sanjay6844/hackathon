import React,{useContext,useEffect} from "react";
import "./chart.css"
import RefContext from "Utilities/refContext";
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
const Chart=()=>{
  const ctx = useContext(RefContext);
  const { store,actions} = ctx;
  const { getReloadData } = actions;
  const { excelData } = store;
  useEffect(()=>{
    getReloadData()
    
  })
  useEffect(()=>{
    console.log(excelData,"get")
  })
  return(

    <div className="charts">
      <div className="piechart">
        <div className="hover">Piechart</div>
        <div className="plots">{excelData!==null&&<Piechart excelData={excelData}/>}</div>
      </div>
      <div className="barchart">
        <div className="hover">Barchart</div>
        <div className="plots"><Barchart /></div>
      </div>
    </div>
  )
}
export default Chart;