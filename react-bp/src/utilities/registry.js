// Controllers
import Home from "Pages/Home";
import SignIn from "Pages/SignIn"
import SignUp from "Pages/SignUp"
function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, "Home"),
  SignIn:Injector(SignIn,"SignIn"),
  SignUp:Injector(SignUp,"SignUP")
};
