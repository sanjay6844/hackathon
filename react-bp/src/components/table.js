import React, { useContext, useEffect ,useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefContext from "Utilities/refContext";

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

  const handleColumnToggle = (columnId) => {
    setShowColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: !prevColumns[columnId],
    }));
  };

  const filteredData = data.filter((item) =>
    Object.keys(item)
      .filter((key) => showColumns[key])
      .some((key) => String(item[key]).toLowerCase().includes(searchText.toLowerCase()))
  );


    








  return(<div>
    <div>
      
      <IconButton>
        <FilterListIcon />
      </IconButton>
    </div>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              showColumns[column.id] && (
                <TableCell key={column.id}>{column.label}</TableCell>
              )
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.productId}>
              {columns.map((column) => (
                showColumns[column.id] && (
                  <TableCell key={column.id}>{row[column.id]}</TableCell>
                )
              ))}
              {/* Add Profit/Loss calculation logic here */}
              <TableCell>{row.salesAmount - row.cost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>)
}
export default TablePage;