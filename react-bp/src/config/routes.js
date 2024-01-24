import React from "react";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";

const fetchRoutes = (containers) => {
  const { Home } = containers;

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
        children : [{
          path: "/",
          element: <Home />,
        },
        {
          path: "/home",
          element: <Home />,
          
        }
      ],
      },
        
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
