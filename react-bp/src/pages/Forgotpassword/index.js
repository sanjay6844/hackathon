/* eslint-disable import/default */
/* eslint-disable import/namespace */
import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";

import Forgotpassword from "./forgotpassword";
import {} from "react-router-dom";

const Forgotpasswords = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <Forgotpassword />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default Forgotpasswords;