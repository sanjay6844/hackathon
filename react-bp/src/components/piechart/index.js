import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
// import Homepage from "./home";
import {} from "react-router-dom";
import Piechart from "./piechart";

const PieChart = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <Piechart />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default PieChart;
