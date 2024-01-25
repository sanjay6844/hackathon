import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import Upload from "../../components/upload";
import "./home.css"

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

    

  


  return (<div className="home">
    <Upload/>
  </div>
   
  );

};

export default Homepage;
