/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
// Controllers
import Home from "Pages/Home";
<<<<<<< HEAD
=======
import Chart from "Pages/Chart/chart";
import Table from "Pages/Table/table";
import SignIn from "Pages/SignIn";
import Piechart from "../components/piechart/piechart";
import Barchart from "../components/barchart/barchart";
import SignUp from "Pages/SignUp"

>>>>>>> 52b0acb88030cf9c59fa2e73421a3a85a36dea51

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, "Home"),
  Piechart: Injector(Piechart, "Piechart"),
  Chart: Injector(Chart, "Chart"),
  Table: Injector(Table, "Table"),
  SignIn: Injector(SignIn, "SignIn"),
  Barchart: Injector(Barchart, "Barchart"),
  SignUp:Injector(SignUp,"SignUP")


};
