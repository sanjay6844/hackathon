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
  const { fetchLoginData,putUser,getReloadData,deleteUser,assignToDashboardStore} = actions;
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
    let newObj = ""
    users.forEach(user => {
      if(user.id===id){
        console.log(user,"change role")
        newObj= user
      }
    });
    console.log(newObj,"users")
    newObj.role = changedRole
    // console.log(users[id-1])
    putUser(newObj);
    handleClose()
  }

  const disableSuperAdmin=(id)=>{
    if(users[id-1].id===loggedInUser.id){
      return true
    }

    if(loggedInUser.role!=="Super Admin"){
      return true
    }
    if(users[id-1].role==="Super Admin"){
      return true
    }
    return false
  }
  const disableAdmin=(id)=>{
    if(users[id-1].id===loggedInUser.id){
      return true
    }
    if(loggedInUser.role==="User"){
      return true
    }
    if(users[id-1].role==="Admin"){
      return true
    }
    return false

  }
  const disableUser=(id)=>{
    if(users[id-1].id===loggedInUser.id){
      return true
    }
    if(loggedInUser.role==="User"){
      return true
    }
    if(users[id-1].role==="User"){
      return true
    }
    return false
  }

  const deleteDisable=(id)=>{
    if(users[id-1].id===loggedInUser.id){
      return true
    }
    if(loggedInUser.role!=="SuperAdmin"){
      return true
    }
    return false
  }

  useEffect(()=>{
    console.log(users,"useEffect")
    if(!cookies.user){
      navigateTo("/signin")
    }
    if(users===null){
      fetchLoginData()
      getReloadData()
    }
  },[])

  useEffect(()=>{
    console.log(users,"store users")
    if(users!==null&&users!=undefined){
      setUsersData(users)
      users.map((user)=>{
        if(user.email===cookies.user){
          setLoggedInUser(user)
        }
      })
    }
  },[store])


  const handleDelete = (id)=>{
    console.log(id)
    let delId=0
    users.map((user,key)=>{
      if(user.id===id){
        // users.splice(key,0)
        delId=key
      }
    })
    let changedUsers = [...users]
    changedUsers.splice(delId,1)
    // assignToDashboardStore(changedUsers)
    console.log(changedUsers)
    deleteUser(id,changedUsers)
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
              <MenuItem disabled={disableSuperAdmin(id)} onClick={()=>handleRole("Super Admin",id)}>Super Admin</MenuItem>
              <MenuItem disabled={disableAdmin(id)} onClick={()=>handleRole("Admin",id)}>Admin</MenuItem>
              <MenuItem disabled={disableUser(id)} onClick={()=>handleRole("User",id)}>User</MenuItem>
            </Menu>
          </div>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              className="delete-btn-user"
              disabled={deleteDisable(id)}
              icon={<DeleteIcon className="delete-icon"/>}
              label="Delete"
              onClick={()=>handleDelete(id)}
              // sx={{color:"red"}}
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