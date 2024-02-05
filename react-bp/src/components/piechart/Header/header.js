/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React,{useContext} from "react";
import {  useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie"
// import MenuIcon from "@mui/icons-material/Menu";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Fade from "@mui/material/Fade";
import RefContext from "Utilities/refContext";


import "./header.css"
const Header=(data)=>{
  // const ctx = useContext(RefContext);
  // const {  actions } = ctx;
  // const { deleteAllData} = actions;
  console.log(data)
  const [, , removeCookie] = useCookies(["user"])
  const navigate = useNavigate()
  const logout=()=>{
    removeCookie("user", ["user"], { path: "/" })
    //data.actions.dashboardActions.deleteAllData()
    navigate("/signin")
  }
  const next =()=>{
    navigate("/piechart")
    setAnchorEl(null);
  }
  const back = ()=>{
    navigate("/home")
    setAnchorEl(null);
  }
  const profitLoss = ()=>{
    navigate("/barchart")
    setAnchorEl(null)
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div className="header">
      <div className="excel" onClick={back} style={{cursor:"pointer"}}>
        Excel Visualiser
      </div>
      <div className="logout">
        {/* {window.location.pathname==="/table" && 
        <Button onClick={next} variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}}>Next</Button>}
    
        { window.location.pathname==="/chart" && 
        <Button onClick={back} variant="contained">Back</Button>}
        <MenuIcon onClick={menu}/>
        {open && 
          <div>
            {<div onClick={logout} >Logout</div>}
          </div>
        } */}
        {window.location.pathname==="/home" && 
          <>
            <Button onClick={profitLoss} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Sales & Profit</Button>
            <Button onClick={next} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Asset Allocation</Button>
          </>}
        {window.location.pathname==="/barchart" && 
        <><Button onClick={back} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Home</Button>
          <Button onClick={next} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Asset Allocation</Button></>}
        {window.location.pathname==="/piechart" && 
          <><Button onClick={back} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Home</Button>
            <Button onClick={profitLoss} variant="contained" sx={{ color: "#615d6e", backgroundColor: "white", "&:hover": { color: "white" } }}>Sales & Profit</Button></>}
        <Button onClick={logout} variant="contained"  sx={{color:"#615d6e",backgroundColor:"white","&:hover":{color:"white"}}}>Logout</Button>
      </div>
    </div>
  )
}
export default Header;