import React,{useContext, useEffect,useState} from "react";
import "./chart.css"
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
import RefContext from "Utilities/refContext";

const ChartPage=()=>{
  const ctx = useContext(RefContext);
  const { store,actions } = ctx;
  const { excelData } = store;
  const { getReloadData} = actions;
  const [pieData,setPieData] = useState(null)
  const [barData,setBarData] = useState(null)
  useEffect(()=>{
    getReloadData()
  },[])
  useEffect(()=>{
  },[store])

  return(
    <div className="charts">
      <div className="piechart">
        <div className="hover">Piechart</div>
        <div className="plots">
          {excelData!==null&&<Piechart  excelData={excelData} />}
        </div>
      </div>
      <div className="barchart">
        <div className="hover">Barchart</div>
        <div className="plots">
          {excelData!==null&&<Barchart  excelData={excelData} />}
        </div>
      </div>
    </div>
  )
}
export default ChartPage;