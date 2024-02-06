import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import Rolepage from "./role";
import {} from "react-router-dom";

const Role = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <Rolepage/>
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default Role;
