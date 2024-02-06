import React from "react";
import { createBrowserRouter, RouterProvider ,Outlet} from "react-router-dom";
// import BarChart from "../components/barchart/barchart";

const fetchRoutes = (containers) => {
  const { Home,SignIn,SignUp,Chart,Table,Header,Piechart,BarCharts,Forgotpassword } = containers;

  return function Routes() {
    const Layout = () => (
      <>
        <Header />
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
          
            },
      
            {
              path:"/chart",
              element: <Chart />
            },
            {
              path:"/piechart",
              element: <Piechart />
            },
            {
              path:"/table",
              element:<Table />
            },
            {
              path:"/barchart",
              element:<BarCharts/>
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
        },
        {
          path:"/forgotpassword",
          element:<Forgotpassword/>
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
