/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
// Controllers
// eslint-disable-next-line import/no-named-as-default-member
import Home from 'Pages/Home';
import Chart from 'Pages/Chart/chart';
import Table from 'Pages/Table/table';
import Piechart from '../components/piechart/piechart';

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, 'Home'),
  Piechart: Injector(Piechart, 'Piechart'),
  Chart: Injector(Chart, 'Chart'),
  Table: Injector(Table, 'Table'),

};
