/* eslint-disable react/jsx-key */
import { upload } from "@testing-library/user-event/dist/upload";
import { cloneDeep } from "lodash";
import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment"
import { TextField,IconButton } from "@mui/material";



import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// GRID
import Box from "@mui/material/Box";
//import Button from '@mui/material/Button';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
const roles = ["Market", "Finance", "Development"];
const randomRole = () => {
  return randomArrayItem(roles);
};










const Upload = () => {
  const [salesProfit,setSalesProfit]=useState("");
  console.log(salesProfit,"sales profit use state value")
  const [assets,setAssets]=useState("");
  console.log(assets,"assets in use sate")

  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllData,getReloadData} = actions;
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
  const [initialRows,setInitialRows]=useState("");
  const [initialRowsOfAssets,setInitialRowsOfAssets]=useState("");

  useEffect(() => {
    const salesProfitWithId= (salesProfit || [])?.map((row)=>{
      return {
        id:randomId(),
        ...row
      }

    }

    )
    setInitialRows(salesProfitWithId)


    const AssetsWithId= (assets || [])?.map((row)=>{
      return {
        id:randomId(),
        ...row
      }

    }

    )
    setInitialRowsOfAssets(AssetsWithId)
    
  }, [salesProfit]);
  

  //const initialRows = salesProfit;

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, "Product ID": "", "Product Name": "","Sales Amount":"" ,"Cost":"","P/L":"", isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  function assetEditToolbar(props) {
    const { setAssetRows, setAssetRowModesModel } = props;

    const handleClickOfAsset = () => {
      const id = randomId();
      setAssetRows((oldRows) => [...oldRows, { id, "Companies": "", "Shares ( % )": "",isNew: true }]);
      setAssetRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClickOfAsset}>
        Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  

  

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [assetrows, setAssetRows] = React.useState(initialRowsOfAssets);
  const [assetrowModesModel, setAssetRowModesModel] = React.useState({});


  useEffect(() => {
    setRows(initialRows);
    setAssetRows(initialRowsOfAssets)

  }, [initialRows,initialRowsOfAssets]);

 
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleRowEditStopOfAsset = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleEditClickOfAsset = (id) => () => {
    setRowModesModel({ ...assetrowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };
  const handleSaveClickOfAsset = (id) => () => {
    setRowModesModel({ ...assetrowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const handleDeleteClickOfAsset = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };
  

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCancelClickOfAsset = (id) => () => {
    setAssetRowModesModel({
      ...assetrowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setAssetRows(rows.filter((row) => row.id !== id));
    }
  };
  


  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const processRowUpdateOfAsset = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setAssetRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowModesModelChangeOfAsset = (newRowModesModel) => {
    setAssetRowModesModel(newRowModesModel);
  };

  const columns1 = [
    { field: "Product ID",
      headerName: "Product ID", 
      type: "number",width: 180,
      align: "left",     
      headerAlign: "left",
      editable: true },
    {
      field: "Product Name",
      headerName: "Product Name",
      width: 280,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "Sales Amount",
      headerName: "Sales Amount",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 180,
      editable: true,
    },
    {
      field: "Cost",
      headerName: "Cost",
      width: 180,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    { field: "P/L", 
      headerName: "P/L", 
      type: "number",
      width: 180, 
      editable: true ,
      align: "left",
      headerAlign: "left",
    },
      

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const columns2 = [
    { field: "Companies",
      headerName: "Companies", 
      type: "number",width: 180,
      align: "left",     
      headerAlign: "left",
      editable: true },
    {
      field: "Shares ( % )",
      headerName: "Shares ( % )",
      width: 280,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    
    

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = assetrowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleEditClickOfAsset(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClickOfAsset(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClickOfAsset(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClickOfAsset(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  
  
  

 
  


  



  return (
    <>
      <div>
        
        <input type="file"  style={{}} onChange={handleFileChange} />
        <Button component="label" variant="contained"  onClick={handleUpload} startIcon={<CloudUploadIcon />}>
      Upload file

        </Button>
      </div>
      <div>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns1}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </div>
      <div>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGrid
            rows={assetrows}
            columns={columns2}
            editMode="row"
            rowModesModel={assetrowModesModel}
            onRowModesModelChange={handleRowModesModelChangeOfAsset}
            onRowEditStop={handleRowEditStopOfAsset}
            processRowUpdate={processRowUpdateOfAsset}
            slots={{
              toolbar: assetEditToolbar,
            }}
            slotProps={{
              toolbar: { setAssetRows, setAssetRowModesModel },
            }}
          />
        </Box>
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
