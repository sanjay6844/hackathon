/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
// Controllers
import Home from "Pages/Home";
import Chart from "Pages/Chart/chart";
import TablePage from "../components/table/table";
import SignIn from "Pages/SignIn";
import Piechart from "../components/piechart/piechart";
import Barchart from "../components/barchart/barchart";
import SignUp from "Pages/SignUp"


function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, "Home"),
  Piechart: Injector(Piechart, "Piechart"),
  Chart: Injector(Chart, "Chart"),
  TablePage: Injector(TablePage, "TablePage"),
  SignIn: Injector(SignIn, "SignIn"),
  Barchart: Injector(Barchart, "Barchart"),
  SignUp:Injector(SignUp,"SignUP")


};
