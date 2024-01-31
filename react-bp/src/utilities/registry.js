/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
// Controllers
import Home from "Pages/Home";
import Charts from "Pages/Chart";
import SignIn from "Pages/SignIn";
import Header from "../components/piechart/Header/header";
import Barchart from "../components/barchart/barchart";
import SignUp from "Pages/SignUp"
import PieCharts from "Pages/Pies";

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, "Home"),
  Chart: Injector(Charts, "Chart"),
  SignIn: Injector(SignIn, "SignIn"),
  Barchart: Injector(Barchart, "Barchart"),
  SignUp:Injector(SignUp,"SignUP"),
  Header:Injector(Header,"Header"),
  Piechart: Injector(PieCharts, "Piechart"),
};
