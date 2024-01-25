import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import ChartPage from "./chart";

import {} from "react-router-dom";

const Chart= (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <ChartPage/>
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default Chart;