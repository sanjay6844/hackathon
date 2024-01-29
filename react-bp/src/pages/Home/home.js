import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import Upload from "../../components/upload";
import "./home.css"
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser ,} = actions;
  const { testData } = store;
  const [cookies,setCookies] = useCookies()
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

    

  


  return (<><div><Upload/></div>
  </>
  
  );

};

export default Homepage;
