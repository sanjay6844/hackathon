import React from "react";
import { BrowserRouter as Route } from "react-router-dom";
import "../../index.css"
import Reduxifier from "Utilities/reduxifier";
import Registry from "Utilities/registry";
import { fetchRoutes } from "Config/routes";

const Containers = Reduxifier.bindReactRedux(Registry);
const Routes = fetchRoutes(Containers);

const Application = () => {
  const renderContent = () => {
    const components = [];
    components.push(
      <>
        <Route />
      </>
    );

    return components;
  };

  return (
    <div style={{height:"100vh", "background-color":"#e5e5e5"
    }}>
      <Routes />
    </div>
  );
};

export default Application;
