import React ,{useEffect,useContext,useState} from "react";
import "./../SignIn/SignIn.css"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {  DatePicker } from "@mui/x-date-pickers";
import {useNavigate} from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import dayjs from "dayjs"
import RefContext from "Utilities/refContext";
import { useCookies } from "react-cookie"
import Snackbar from "@mui/material/Snackbar";
import { TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignUpPage = ()=>{

  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { fetchLoginData,postData } = actions;
  const { users } = store;
  const navigateTo = useNavigate()
  // const [users,setUsers] = useState(null)
  const [cookies, setCookies] = useCookies(["user"])
  const [open,setOpen] = useState(false)
  const [showPassword,setShowPassword] = useState(false)
  const [showConfPassword,setShowConfPassword] = useState(false)
  useEffect(()=>{
    fetchLoginData()
    console.log(users)
    if(cookies.user){
      navigateTo("/home")
    }
  },[])

  const isNewUser = () =>{
    let value = true
    let { email} = getValues()
    users?.map(user=>{
      if(user.email===email){
        value = false
        return
      }
    })
    return value
  }

  function isConPassword(value) {
    console.log("running")
    const { password } = getValues()
    if (password === value) {
      return true
    }
    return false
  }

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm()

  const onSubmit = (data)=>{
    delete data["confirmPassword"]
    let newData = {...data,columnVisibility:{},role:"user",assetsColumnVisibility:{}}
    postData(newData)
    setCookies("user",data.email)
    setOpen(true)
    setTimeout(()=>{
      navigateTo("/home")
    },1000)
    
  }

  return(
    <div className="container">
      <div className="card">
        <div className="heading">Sign Up</div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField  label="Name" type="text" {...register("name",{required:true,
          })}
          error={
            errors.name &&
            errors.name.type === "required" &&
            "this field is required"
          }
          helperText={
            errors.name &&
            errors.name.type === "required" &&
            "this field is required"
          }
          />
          <TextField label="Email" type="email" {...register("email",{required:true,validate:{
            isNewUser: isNewUser,
          },
          pattern:
                /(?=.*^[a-zA-Z])(?=.*@)(?=.*\.)(?=.*[a-zA-Z]$)(?!.*\.\.)/,
          })}
          error={
            (errors.email &&
              errors.email.type === "pattern" &&
              "please enter valid email") ||
            (errors.email &&
              errors.email.type === "required" &&
              "this is field is required") ||
            (errors.email &&
              errors.email.type === "isNewUser" &&
              "user already exist")
          }
          helperText={
            (errors.email &&
              errors.email.type === "pattern" &&
              "please enter valid email") ||
            (errors.email &&
              errors.email.type === "required" &&
              "this is field is required") ||
            (errors.email &&
              errors.email.type === "isNewUser" &&
              "user already exist")
          }

          />
          <div>
            <Controller
              control={control}
              name = "dob"
              rules={{required:true
                ,
                validate: {
                  max: (e) => {
                    if (dayjs(e) < dayjs()) {
                      return true
                    }
                    return false
                  },
                },
              }}
              render={({field})=>{
                return(
                  <LocalizationProvider 
                    adapterLocale={"en-gb"}
                    dateAdapter={AdapterDayjs}
                    inputRef={field.ref}
                  >
                    <DatePicker 
                      disableFuture
                      label="Date of Birth"
                      value={field?.value && dayjs(field?.value)}
                      onChange={(date) => {
                        field?.onChange(date);
                      }}
                      slotProps={{
                        textField: {
                          error:
                            (errors.dob &&
                              errors.dob.type === "required" &&
                              "This field is required") ||
                            (errors.dob &&
                              errors.dob.type === "max" &&
                              "enter past date"),
                          helperText:
                            (errors.dob &&
                              errors.dob.type === "required" &&
                              "This field is required") ||
                            (errors.dob &&
                              errors.dob.type === "max" &&
                              "Enter past date"),
                        },
                      }}

                    />
                  </LocalizationProvider>  
                )
              }}
            />
          </div>
          <TextField label="Contact Number" type="number" {...register("contactNumber",{required:true,maxLength:10,minLength:10})}
            error={
              errors.contactNumber &&
            errors.contactNumber.type === "required" &&
            "This field is required"||
            errors.contactNumber&&
            (errors.contactNumber.type=== "maxLength"||errors.contactNumber.type==="minLength")&&
            "Enter valid phone number"
            }
            helperText={
              errors.contactNumber &&
            errors.contactNumber.type === "required" &&
            "This field is required"||
            errors.contactNumber&&
            (errors.contactNumber.type=== "maxLength"||errors.contactNumber.type==="minLength")&&
            "Enter valid phone number"
            }

          />    
          <div className="password-field">
            
            <TextField label="Password" type={showPassword?"text":"password"} {...register("password",{required:true,pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/})}
              placeholder="Aa@1sdfwh"
              onCut={(e)=>e.preventDefault()}
              onCopy={(e)=>e.preventDefault()}
              autoComplete="off"
              error={
                (errors.password &&
               errors.password.type === "required" &&
               "this field is required") ||
             (errors.password &&
               errors.password.type === "minLength" &&
               "password must be more than 8 characters") ||
             (errors.password &&
               errors.password.type === "pattern" &&
               "must be alhpa numeric and contain atleast one special character")
              }
              helperText={
                (errors.password &&
               errors.password.type === "required" &&
               "this field is required") ||
             (errors.password &&
               errors.password.type === "minLength" &&
               "password must be more than 8 characters") ||
             (errors.password &&
               errors.password.type === "pattern" &&
               "must be alhpa numeric and contain atleast one special character")
              }
              
            />
            <div onClick={()=>setShowPassword(!showPassword)} aria-hidden className="eye-icon">
              {showPassword?< VisibilityIcon/>:<VisibilityOffIcon/>}
            </div>
          </div> 
          <div className="password-field">
            <TextField label="Confirm Password" autoComplete="off" type={showConfPassword?"text":"password"} {...register("confirmPassword",{validate: {
              checkPassword: isConPassword,
            },
            })}
            error={
              errors.confirmPassword &&
            errors.confirmPassword.type === "checkPassword" &&
            "does'nt match with the password"
            }
            helperText={
              errors.confirmPassword &&
            errors.confirmPassword.type === "checkPassword" &&
            "does'nt match with the password"
            }
            />
            <div onClick={()=>setShowConfPassword(!showConfPassword)} aria-hidden className="eye-icon">
              {showConfPassword?< VisibilityIcon/>:<VisibilityOffIcon/>}
            </div>
          </div>
          <div className="btn-container">
            <input className="submit-btn" type="submit" value="SignUp" onClick={handleSubmit} />
          </div>
        </form>
      </div>
      <div>Already hava an account? <a href="/signin">Signin</a></div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={()=>{setOpen(false)}}
        message="Succesfully logged in"
      />
    </div>
  )
}

export default SignUpPage