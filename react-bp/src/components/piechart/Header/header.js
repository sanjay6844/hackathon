/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import {  useNavigate } from "react-router-dom"
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie"
// import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

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
    setAnchorEl(null);
  }
  const back = ()=>{
    navigate("/home")
    setAnchorEl(null);
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
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="contained"
          sx={{color:"#615d6e",backgroundColor:"white"}}
        >
        Dashboard
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={back}>Home</MenuItem>
          <MenuItem onClick={next}>Chart</MenuItem>
        </Menu>
        <Button onClick={logout} variant="contained"  sx={{color:"#615d6e",backgroundColor:"white"}}>Logout</Button>
      </div>
    </div>
  )
}
export default Header;