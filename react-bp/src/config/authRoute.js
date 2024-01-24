import React from "react";
import { Route, Navigate } from "react-router-dom";
import cookie from "react-cookies";

const AuthRoute = ({ ...restProps }) => {
  const acctoken = cookie.load("access_token");
  if (!acctoken) {
    return <Navigate to="/login" />;
  }
  return <Route {...restProps} />;
};

export default AuthRoute;
