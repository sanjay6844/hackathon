import React from "react";
import "./chart.css"
import Piechart from "../../components/piechart/piechart";
import Barchart from "../../components/barchart/barchart";
const Chart=()=>{
    return(
        <div className="charts">
            <div className="piechart">
                <div className="hover">Piechart</div>
                <div className="plots"><Piechart /></div>
            </div>
            <div className="barchart">
                <div className="hover">Barchart</div>
                <div className="plots"><Barchart /></div>
            </div>
        </div>
    )
}
export default Chart;