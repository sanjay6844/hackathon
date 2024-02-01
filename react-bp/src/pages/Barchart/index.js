/* eslint-disable import/default */
/* eslint-disable import/namespace */
import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
// import Homepage from "./home";
import BarChartPage from "./barchart";
import {} from "react-router-dom";

const BarCharts = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <BarChartPage />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default BarCharts;
