import React from "react";
import "./chart.css"
import Piechart from "../../components/piechart/piechart";
const Chart=()=>{
    return(
        <div className="charts">
            <div className="piechart">
                <div className="names">Piechart</div>
                <div className="plots"><Piechart /></div>
            </div>
            <div className="barchart">
                <div className="names">Barchart</div>
                <div className="plots"></div>
            </div>
        </div>
    )
}
export default Chart;