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
  return(
    <div className="header">
      <div className="excel">
        Excel Visualiser
      </div>
      <div className="logout">
        <Button variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}} onClick={logout} >Logout</Button>
      </div>
    </div>
  )
}
export default Header;