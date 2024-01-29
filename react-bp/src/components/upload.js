
import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./upload.css"






const Upload = () => {
 
  const [salesProfit,setSalesProfit]=useState("");
  console.log(salesProfit,"sales profit use state value")
  const [assets,setAssets]=useState("");
  console.log(assets,"assets in use sate")

  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllData} = actions;

  useEffect(() => {
    // getAllRequetUser();
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
  
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFileChange = async (event) => {
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
  };
  // table
  const assetColumn=[
    {
      id:"Companies",
      label:"Companies"
    },
    {
      id:"Shares ( % )",
      label:"Shares ( % )"
    }
  ]
  const columns = [
    { id: "Product ID", label: "Product ID", minWidth: 170 },
    {
      id: "Product Name",
      label: "Product Name",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "Sales Amount",
      label: "Sales Amount",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),

    },
    {
      id: "Cost",
      label: "Cost",
      minWidth: 170,
      align: "right",
      format: (value) => value.toFixed(2),
    },
    { id: "P/L", label: "P/L", minWidth: 100 ,
      format: (value) => value.toFixed(2),
    },

  ];
  
  
  


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //grid
  


  return (
    <>
      <div>
        
        <input type="file" style={{cursor: "pointer"}} onChange={handleFileChange} />
        <Button component="label" variant="contained"  onClick={handleUpload} startIcon={<CloudUploadIcon />}>
      Upload file

        </Button>
      </div>
      <div>
        <div></div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(salesProfit || [])?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          console.log(row[column.id],"row coloum id",row,column)
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={salesProfit?.length || 10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      
      </div>
      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" ,margin:"50px 0px"}}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {assetColumn.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(assets || [])?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {assetColumn.map((column) => {
                          console.log(row[column.id],"row coloum id",row,column)
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={assets?.length || 10}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      
      </div>
    </>);
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
