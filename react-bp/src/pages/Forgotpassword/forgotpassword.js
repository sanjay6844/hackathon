import React, { useContext,useEffect,useState } from "react";
import "../SignIn/SignIn.css";
import { useNavigate } from "react-router-dom";
import RefContext from "Utilities/refContext";
// import Popup from "reactjs-popup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";


const Forgotpassword=()=>{
  const ctx = useContext(RefContext);
  const navigateTo = useNavigate()
  const { store,actions } = ctx;
  const { users} = store;
  const {fetchLoginData,updateLogindata} = actions
  const [show,setShow]=useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [showPass,setShowPass] = useState(false)
  // const [password,setPassword]=useState("")
  // const [conpassword,setConpassword]=useState()
  useEffect(()=>{
    fetchLoginData()
  },[])
  const onSubmit=(data)=>{
    
    if(errors){
      setShow(true)
    }
    console.log(data.passwords,data.confirmspassword,"sssss")
    if(data.passwords && data.confirmspassword){
      users?.forEach((user)=>{
        if(user.email===data.email){
          console.log("done")
          const temp={
            "name":user.name,
            "email":user.email,
            "contactNumber":user.contactNumber,
            "password":data.passwords,
            "confirmpassword":data.confirmspassword,
            "dob":user.dob,
            "id":user.id
          }
          updateLogindata(temp)
          navigateTo("/signin")
          
        }
      })
      
    }
  }
  function isConPassword(value) {
  
    const { password } = getValues()
    if (password === value) {
      return true
    }
    return false
  }
 
  function validation() {
    let v = 0
    const { email } = getValues()
 
    users?.forEach((user) => {
      if (user.email === email) {
        v = 1
      }
    })
    if (v === 1) {
      return true
    } else return false
  }
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  }=useForm()
  return(
    <div className="container">
      <div className="card">
        <div className="heading">Forgot Password</div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Email" type="email" {...register("email",{required:true,
            pattern:
            /(?=.*^[a-zA-Z])(?=.*@)(?=.*\.)(?=.*[a-zA-Z]$)(?!.*\.\.)/,
            validate: {
              emailValidation: validation,
            },
          })}
          error={
            (errors.email &&
      errors.email.type === "pattern" &&
      "please enter valid email") ||
    (errors.email &&
      errors.email.type === "required" &&
      "this field is required")||
      (errors.email &&
        errors.email.type === "emailValidation" &&
        "user not found")
          }
          helperText={
            (errors.email &&
      errors.email.type === "pattern" &&
      "please enter valid email") ||
    (errors.email &&
      errors.email.type === "required" &&
      "this is field is required") ||
      (errors.email &&
        errors.email.type === "emailValidation" &&
        "user not found")
          }/>

          {show &&  <>
            <div className="password-field"><TextField label="New Password" type={showPass?"text":"password"}
              {...register("passwords",{required:true,pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/})}
              onCut={(e)=>e.preventDefault()}
              onCopy={(e)=>e.preventDefault()}
              placeholder="Aa@1sdfwh"
              error={
                (errors.password &&
         errors.password.type === "required" &&
         "this field is required") ||
       (errors.password &&
         errors.password.type === "pattern" &&
         "must be alhpa numeric and contain atleast one special character")
              }
              helperText={
                (errors.password &&
         errors.password.type === "required" &&
         "this field is required") ||
       (errors.password &&
         errors.password.type === "pattern" &&
         "must be alhpa numeric and contain atleast one special character")
              }
        
            />
            <div onClick={()=>setShowPass(!showPass)} aria-hidden className="eye-icon">
              {showPass?< VisibilityIcon/>:<VisibilityOffIcon/>}
            </div></div>
            <div className="password-field"><TextField label="Retype Password" type={showPassword?"text":"password"}  required 
              {...register("confirmspassword",{validate: {
                checkPassword: isConPassword,
              }})}
              error={
                errors.confirmPassword &&
        errors.confirmPassword.type === "checkPassword" &&
        "does'nt match with the password"
              }
              helperText={
                errors.confirmPassword &&
        errors.confirmPassword.type === "checkPassword" &&
        "does'nt match with the password"
              }/>
            <div onClick={()=>setShowPassword(!showPassword)} aria-hidden className="eye-icon">
              {showPassword?< VisibilityIcon/>:<VisibilityOffIcon/>}
            </div></div>
          </>}
          <div className="btn-container">
            <input className="submit-btn" type="submit" value="Submit" onClick={handleSubmit} />
          </div>        </form>
      </div>
    </div>
    
  )
}
export default Forgotpassword;
