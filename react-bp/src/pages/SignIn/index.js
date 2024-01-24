import React from "react";

import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import SignInPage from "./SignIn";
import {} from "react-router-dom";

const SignIn = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <SignInPage />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default SignIn;