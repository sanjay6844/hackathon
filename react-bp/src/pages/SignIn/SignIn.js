import React ,{useContext, useEffect,useState}from "react";
import "./SignIn.css"
import { useForm } from "react-hook-form"
import RefContext from "Utilities/refContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"
import Snackbar from "@mui/material/Snackbar";
import { TextField } from "@mui/material";

const SignInPage = ()=>{
  const ctx = useContext(RefContext);
  const { store,actions } = ctx;
  const { users} = store;
  const {fetchLoginData,} = actions
  const [cookies, setCookies] = useCookies(["user"])
  const [open,setOpen] = useState(false)

  useEffect(()=>{
    if(cookies.user){
      navigateTo("/home")
    }
    fetchLoginData()
  },[])

  const navigateTo = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  function validation() {
    let v = 0
    const { email } = getValues()
    console.log(email,"email in form")
    console.log(users,"users")
    users?.forEach((user) => {
      if (user.email === email) {
        v = 1
      }
    })
    if (v === 1) {
      return true
    } else return false
  }

  function isPasswordValid() {
    let v = 0
    const { email, password } = getValues()
    if (!validation()) {
      return true
    }
    users.forEach((user) => {
      if (user.email === email && user.password === password) {
        v = 1
      }
    })
    if (v === 1) {
      return true
    }
    return false
  }


  
  const onSubmit = (data)=>{
    setCookies("user",data.email)
    setOpen(true)
    setTimeout(()=>{
      navigateTo("/home")
    },1000)
  }

  return(
    <div className="container">
      <div className="card">
        <div className="heading">Sign In</div>
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
          }
          />
   
          <TextField label="Password" type="password" {...register("password",{required:true,validate: {
            checkPassword: isPasswordValid,
          },
          })}
          placeholder="Aa@1sdfwh"
          onCut={(e)=>e.preventDefault()}
          onCopy={(e)=>e.preventDefault()}
          error={
            (errors.password &&
           errors.password.type === "required" &&
           "this field is required") ||
           (errors.password &&
            errors.password.type === "checkPassword" &&
            "wrong password")
          }
          helperText={
            (errors.password &&
           errors.password.type === "required" &&
           "this field is required") ||
           (errors.password &&
            errors.password.type === "checkPassword" &&
            "wrong password")
          }
          />
          {console.log(errors)}
          <div className="btn-container">
            <input className="submit-btn" type="submit" value="SignIn" onClick={handleSubmit} />
          </div>
        </form>
      </div>
      <div className="link">Don&apos;t hava an account? <a href="/">Signup</a></div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={()=>{setOpen(false)}}
        message="Succesfully logged in"
      />
    </div>
  )
}
export default SignInPage