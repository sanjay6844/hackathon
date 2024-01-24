import React from "react";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";
// import BarChart from "../components/barchart/barchart";

const fetchRoutes = (containers) => {
  const { Home,SignIn,Barchart,SignUp } = containers;

  return function Routes() {
    const Layout = () => (
      <>
        {/* <Header /> */}
        <div> Header </div>
        <Outlet />
      </>
    );
    const createRoutes = () => {
      return createBrowserRouter([
        { 
          element: <Layout />,
          errorElement : <div>404 No Page Found</div>,
          children : [
            {
              path: "/home",
              element: <Home/>,
          
            }
          ],
        },
        {
          path:"/signin",
          element:<SignIn/>
        },
        {
          path:"/",
          element:<SignUp/>
        }
        
      ]);
    };
    return (
      <>
        <RouterProvider router={createRoutes()} />
      </>
    );
  };
};

export { fetchRoutes };
