import React, {  useEffect } from "react";
// import RefContext from "Utilities/refContext";
import Upload from "../../components/upload";
import "./home.css"
import {useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // const ctx = useContext(RefContext);
  // const { store, actions } = ctx;
  // const { getAllRequetUser ,} = actions;
  // const { testData } = store;
  const [cookies] = useCookies()
  const navigateTo = useNavigate()
  useEffect(() => {
    //getAllRequetUser();
    if(!cookies.user){
      navigateTo("/signin")
    }
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
