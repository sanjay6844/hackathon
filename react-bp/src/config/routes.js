import React from "react";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";

const fetchRoutes = (containers) => {
  const { Home,Piechart,Chart,Table } = containers;

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
          
        },
        {
          path:"/piechart",
          element: <Piechart />
        },
        {
          path:"/chart",
          element: <Chart />
        },
        {
          path:"/table",
          element:<Table />
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
