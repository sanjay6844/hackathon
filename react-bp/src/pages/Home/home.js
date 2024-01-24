import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import Upload from "../../components/upload";
import TablePage from "../../components/table";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser } = actions;
  const { testData } = store;
  useEffect(() => {
<<<<<<< HEAD
    //getAllRequetUser();
  }, []);
  useEffect(() => {
    //console.log(testData, "items");
  }, [testData]);
=======
    // getAllRequetUser();
  }, []);
  // useEffect(() => {
  //   console.log(testData, "items");
  // }, [testData]);
>>>>>>> 52b0acb88030cf9c59fa2e73421a3a85a36dea51
  // console.log(ctx, "ctx");

    

  


  return (<><div><Upload/></div>
  {/* <div><TablePage/></div> */}</>
  );
  //enable this if need to use DB json
  // <div>
  //     {testData && testData.map((dataValue, index) => {
  //         return (
  //             <div key={index}>
  //                 <h3> Title :{dataValue.title}</h3>
  //                 <h5>Tags :{dataValue.tags}</h5>
  //             </div>
  //         )
  //     })}
  // </div>
};

export default Homepage;
