import React from "react";
import "./table.css"
import  { useContext, useEffect ,useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
const data = [
  { productId: 1, productName: "Product A", salesAmount: 100, cost: 80 },
  { productId: 2, productName: "Product B", salesAmount: 150, cost: 120 },
  // Add more data as needed
];

const columns = [
  { id: "productId", label: "Product ID" },
  { id: "productName", label: "Product Name" },
  { id: "salesAmount", label: "Sales Amount" },
  { id: "cost", label: "Cost" },
  { id: "profitLoss", label: "Profit/Loss" },
];



const TablePage =()=>{
  const [searchText, setSearchText] = useState("");
  const [showColumns, setShowColumns] = useState({
    productId: true,
    productName: true,
    salesAmount: true,
    cost: true,
    profitLoss: true,
  });

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.keys(item)
      .filter((key) => showColumns[key])
      .some((key) => String(item[key]).toLowerCase().includes(searchText.toLowerCase()))
  );


  return(<div>
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton>
        <FilterListIcon />
      </IconButton>
    </div>

  </div>)
}

export default TablePage;