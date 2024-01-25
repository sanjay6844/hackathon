import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import Upload from "../../components/upload";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser ,} = actions;
  const { testData } = store;
  useEffect(() => {
    //getAllRequetUser();
    //getAllRequetUser();
    
  }, []);

  // useEffect(() => {
  //   console.log(testData, "items");
  // }, [testData]);
  // console.log(ctx, "ctx");
  return (<>
    <div><Upload/></div>
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
