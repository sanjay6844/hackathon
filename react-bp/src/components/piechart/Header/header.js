import React from "react";
import Button from "@mui/material/Button";
import "./header.css"
const Header=()=>{
  return(
    <div className="header">
      <div className="excel">
        Excel Visualiser
      </div>
      <div className="logout">
        <Button variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}} >Logout</Button>
      </div>
    </div>
  )
}
export default Header;