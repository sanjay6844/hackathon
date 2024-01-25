import React from "react";
import {  useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie"

import "./header.css"
const Header=()=>{
  const [, , removeCookie] = useCookies(["user"])
  const navigate = useNavigate()
  const logout=()=>{
    removeCookie("user", ["user"], { path: "/" })
    navigate("/signin")
  }
  const next =()=>{
    navigate("/chart")
  }
  return(
    <div className="header">
      <div className="excel">
        Excel Visualiser
      </div>
      <div className="logout">
        {
          window.location.pathname==="/table" && 
        <Button variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}} onClick={next} >NEXT</Button>
        }
        <Button variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}} onClick={logout} >Logout</Button>
      </div>
    </div>
  )
}
export default Header;