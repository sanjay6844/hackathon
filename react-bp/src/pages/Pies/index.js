/* eslint-disable import/default */
/* eslint-disable import/namespace */
import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
// import Homepage from "./home";
import Pie from "./piechart";
import {} from "react-router-dom";

const PieCharts = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <Pie />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default PieCharts;