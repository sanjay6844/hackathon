import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import Chart from "./chart";

import {} from "react-router-dom";

const ChartPage= (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <Chart/>
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default ChartPage;