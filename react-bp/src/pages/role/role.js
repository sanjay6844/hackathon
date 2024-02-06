/* eslint-disable import/named */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useEffect,useContext, useState } from "react";
import "./role.css"
import { useNavigate } from "react-router-dom";
import {useCookies } from "react-cookie";
import RefContext from "Utilities/refContext";
import { DataGrid,GridActionsCellItem } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";


const Rolepage = ()=>{
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { fetchLoginData,putUser,getReloadData} = actions;
  const { users } = store;
  const navigateTo = useNavigate()
  const [cookies] = useCookies()
  const [usersData,setUsersData] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedInUser,setLoggedInUser] = useState(null)
  const open = Boolean(anchorEl);
  const [clickedId,setClickedId] = useState(null)
  // const [open,setOpen] = useState(false)
  const [count,setCount] = useState(null)
  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
    setClickedId(id)
  };
  const handleClose = (data) => {
    setAnchorEl(null);
  };

  const handleRole=(changedRole,id)=>{
   
    users[id-1].role = changedRole
    console.log(users[id],"users")
    putUser(users[id-1])
    handleClose()
  }

  useEffect(()=>{
    if(!cookies.user){
      navigateTo("/signin")
    }
    if(users===null){
      fetchLoginData()
      getReloadData()
    }
  },[])

  useEffect(()=>{
    console.log(users)
    if(users!==null){
      setUsersData(users)
      users.map((user)=>{
        if(user.email===cookies.user){
          setLoggedInUser(user.role)
        }
      })
    }
  },[store])


  const handleDelete = (id)=>{
    console.log(id)
  }

  const rows = usersData
  const columns = [
    {field:"name",headerName:"Name",width:130},
    {field:"email",headerName:"Email",width:300,hideable:false},
    {field:"role",headerName:"Role",width:130},
    {field:"actions",headerName:"actions",type:"actions",width:200,
      getActions:({id})=>{
        // let key = count++
        // console.log(key,"key",id,"id")
        return[
          <div className="menu-container">
            <Tooltip title="Role Change">
              <Button               
                onClick={(event)=>handleClick(event,id)}
              >
                <PersonIcon/>
              </Button>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open&&clickedId===id?true:false}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {console.log(id)}
              {/* {console.log(anchorEl)} */}
              <MenuItem disabled={loggedInUser!=="Super Admin"||cookies.user===users[id-1].email?true:false} onClick={()=>handleRole("Super Admin",id)}>Super Admin</MenuItem>
              <MenuItem disabled={loggedInUser!=="User"||cookies.user===users[id-1].email?false:true} onClick={()=>handleRole("Admin",id)}>Admin</MenuItem>
              <MenuItem disabled={loggedInUser==="User"&&cookies.user===users[id-1].email} onClick={()=>handleRole("User",id)}>User</MenuItem>
            </Menu>
          </div>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              disabled={loggedInUser!=="Super Admin"?true:false}
              icon={<DeleteIcon sx={{color:"red"}}/>}
              label="Delete"
              onClick={()=>handleDelete(id)}
              sx={{color:"red"}}
            />
          </Tooltip>
        ]

      }
    }
  ]
  
  return(
    <div className="role-container">
      <div className="table-container">
        {usersData!==null&&
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />}
      </div>
    </div>
  )
}

export default Rolepage