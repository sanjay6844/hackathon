import { upload } from "@testing-library/user-event/dist/upload";
import { cloneDeep } from "lodash";
import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Upload = () => {
  const [salesProfit,setSalesProfit]=useState("");
  console.log(salesProfit,"sales profit use state value")
  const [assets,setAssets]=useState("");
  console.log(assets,"assets in use sate")

  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser ,getAllData,getReloadData} = actions;
  const { testData } = store;
  useEffect(() => {
    getReloadData();
    
  }, []);
  


  useEffect(() => {
    if(store?.excelData){
      console.log()
      var uploadData = store?.excelData?.["0"]
      console.log(store.excelData[uploadData])
      var asset = uploadData?.["Asset_allocation"]
      var sp = uploadData?.["Sales&Profit"]
      setSalesProfit(sp);
      setAssets(asset);
      console.log(sp, "store values in update page");
    }
    

    
  }, [store]);
  // let uploadData = store?.excelData?.["0"]
  // console.log(store.excelData[uploadData])
  // let asset = uploadData?.["Asset_allocation"]
  // let sp = uploadData?.["Sales&Profit"]
  // console.log(asset,sp, "store values in update page");
  

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0],"file");
  };

  const handleUpload = async() => {
    console.log(selectedFile,"sf")
    const formData = new FormData();
    const file=selectedFile;
    formData.append("file", file);
    console.log(formData,"excel data");
    getAllData(formData);


    // await axios.post("https://excel-8dyl.onrender.com/upload", formData,{
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    // })
    //   .then(response => {
    //     console.log(response.data.data,"responese data");
    //     dispatch(assignToDashboardStore("excelData", response?.data.data));

    //   })
    //   .catch(error => {
    //     console.error('Error uploading file: ', error);
    //   });


  };
  const columns = [
    { id: "productId", label: "Product ID" },
    { id: "productName", label: "Product Name" },
    { id: "salesAmount", label: "Sales Amount" },
    { id: "cost", label: "Cost" },
    { id: "profitLoss", label: "Profit/Loss" },
  ];
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

  


    









  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload Excel</button>
      </div>
      <div>
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
              <TableRow>
                {salesProfit.map((item)=>{
                  <TableCell key={item.id}>{item.Cost}</TableCell>



                })}
              </TableRow>
             
            </TableBody>
          </Table>
        </TableContainer>
      </div></>);
  //enable this if need to use DB json
  // <div>
  //     {testData && testData.map((dataValue, index) => {
  //         return (
  //             <div key={index}>
  //                 <h3> Title :{dataValue.title}</h3>
  //                 <h5>Tags :{dataValue.tags}</h5>
  //             </div>
  //         )
  //     })}
  // </div>
};

export default Upload;
