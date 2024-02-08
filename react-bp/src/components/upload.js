/* eslint-disable import/named */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import clsx from "clsx";

import { ToastContainer, toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import {  useNavigate } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import { upload } from "@testing-library/user-event/dist/upload";
import { cloneDeep, isNumber } from "lodash";
import React, { useContext, useEffect ,useState,useRef} from "react";
import RefContext from "Utilities/refContext";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
import "./upload.css"
// GRID
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
  GridToolbarExport,
  GridToolbar,
  GridToolbarDensitySelector,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  
} from "@mui/x-data-grid";
import {  GridColumnVisibilityModel } from "@mui/x-data-grid";

//modal
//import Button from '@mui/material/Button';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { bouncy } from "ldrs"
import {  useCookies } from "react-cookie";
import { Details } from "@material-ui/icons";








const Upload = () => {
  const [role,setRole]=useState();
  const [cookies] = useCookies(["user"])
  const navigate = useNavigate()
  const [show,setShow] = useState(true)
  const [loading,setLoading] = useState()
  bouncy.register()
  // useEffect(() => {
  //   console.log("inside store effect")
  //   if(store!==undefined&&store?.excelData){
  //     console.log(store,"store")
  //     // var uploadData = store?.excelData?.["0"]
  //     // console.log(store.excelData[uploadData])
  //     // var asset = uploadData?.["Asset_allocation"]
  //     // var sp = uploadData?.["Sales&Profit"]
  //     console.log(store.excelData[0])
  //     if(store.excelData[0]!==undefined&&Array.isArray(store.excelData)){
  //       setSalesProfit(store?.excelData[0]["Sales&Profit"]);
  //       setAssets(store?.excelData[0]["Asset_allocation"]);
  //     }
  //     if(store.excelData!==undefined&&!Array.isArray(store.excelData)){
  //       setSalesProfit(store?.excelData["Sales&Profit"]);
  //       setAssets(store?.excelData["Asset_allocation"]);
  //     }
  //     // console.log(sp, "store values in update page");
  //   } 
  // },[store]);




  const [excelData,setExcelData]=useState([]);
 
  // console.log(salesProfit,"sales profit use state value")
  const [assets,setAssets]=useState("");
  console.log(assets,"assets in use sate")
  
  console.log(RefContext,"refcontext")
  const ctx = useContext(RefContext);
  console.log(ctx,"ctx value")
  const { store, actions } = ctx;
  const { getAllData,getReloadData,updateToStore,updateUserToStore,getReloadDataOfUsers,updateUserToStoreForAssets} = actions;
  const { testData } = store;
  const [salesProfit,setSalesProfit]=useState("");


  const [currentUser,setCurrentUser]=useState();
  const currentUserEmail=cookies.user;

  
  useEffect(() => {
    // getAllRequetUser();
    console.log("reload")
    getReloadData()
    getReloadDataOfUsers()
  }, []);
  
  

  const [columnVisibilityModel, setColumnVisibilityModel] =React.useState();
  const [hasPageRendered,setPageRendered]=useState(false)
  useEffect(()=>{
    if(hasPageRendered && store!==undefined && store?.users!=null)
    {
      console.log("inside if")
      updateUserToStore(columnVisibilityModel,currentUser.id)
    }
    setPageRendered(true);
  },[columnVisibilityModel])

  const [assetsColumnVisibilityModel, setAssetsColumnVisibilityModel] =React.useState();
  const [hasPageRenderedAssets,setPageRenderedAssets]=useState(false)


  useEffect(()=>{
    if(hasPageRenderedAssets && store!==undefined && store?.users!=null)
    {
      updateUserToStoreForAssets(assetsColumnVisibilityModel,currentUser.id)
    }
    setPageRenderedAssets(true);
  },[assetsColumnVisibilityModel])
  const [allow,SetAllow]=useState(true)


  useEffect(() => {

    if(store!=undefined && store.users!=null && allow)
    {
      const user=store?.users?.find(user=>user.email==currentUserEmail)
      console.log("current user detailssssssssssssssssssssssssss",user);
      setCurrentUser(user);
      setRole(user.role);
      setColumnVisibilityModel(user?.columnVisibility)
      setAssetsColumnVisibilityModel(user?.assetsColumnVisibility);
      SetAllow(false)
    }
   
  }, [store]);







  useEffect(() => {
    console.log("current user details",store.currentUser);
    if(store!=undefined && store?.excelData!=null){

      // const user=store?.users?.find(user=>user.email==currentUserEmail)
      // console.log("current user detailssssssssssssssssssssssssss",user);
      // setCurrentUser(user);
      // setColumnVisibilityModel(user?.columnVisibility)
      // setAssetsColumnVisibilityModel(user?.assetsColumnVisibility);





      console.log("inside store effect")
      if(store!==undefined&&store?.excelData){
        console.log(store,"store")
        // var uploadData = store?.excelData?.["0"]
        // console.log(store.excelData[uploadData])
        // var asset = uploadData?.["Asset_allocation"]
        // var sp = uploadData?.["Sales&Profit"]
        console.log(store.excelData[0])
        if(store.excelData[0]!==undefined&&Array.isArray(store.excelData)){
          setSalesProfit(store?.excelData[0]["Sales&Profit"]);
          setAssets(store?.excelData[0]["Asset_allocation"]);
        }
        if(store.excelData!==undefined&&!Array.isArray(store.excelData)){
          setSalesProfit(store?.excelData["Sales&Profit"]);
          setAssets(store?.excelData["Asset_allocation"]);
        }
      
      // console.log(sp, "store values in update page");
      } 
    }
  },[store]);
 

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
    setShow(false)
    console.log(salesProfit,"inside click")
  };
  
  


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
    
  }, [salesProfit,assets,show]);
  

  //const initialRows = salesProfit;

  const[addOn,setAddOn]=useState(false);

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
    const handleClick = () => {
      if(!editOn && !addOn)
      {
        const id = randomId();
        setRows((oldRows) => [{ id, "Product ID": "", "Product Name": "","Sales Amount":"" ,"Cost":"","P/L":"", isNew: true },...oldRows]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "Product ID" },
        }));
        setAddOn(true)
      }
      else if(editOn){
        toast.warn("Edit action is running,Please save or close it")
      }
      else{
        toast.warn("Already add action is running,Please save or close it")


      }
    };


    
   
    
    return (
   
      <Button sx={{color:"#615d6e"}} startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    
    );
  }
  function assetEditToolbar(props) {
    const { setAssetRows, setAssetRowModesModel } = props;

    const handleClickOfAsset = () => {
      if(!editOn && !addOn){
        const id = randomId();
        setAssetRows((oldRows) => [...oldRows, { id, "Companies": "", "Shares ( % )": "",isNew: true }]);
        setAssetRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.Edit, fieldToFocus: "Companies" },
        }));
        setAddOn(true)

      }
      else if(editOn){
        toast.warn("Edit action is running,Please save or close it")
      }
      else{
        toast.warn("Already add action is running,Please save or close it")


      }
    };

    return (
      <GridToolbarContainer>
        <Button sx={{color:"#615d6e"}} startIcon={<AddIcon />} onClick={handleClickOfAsset}>
        Add record
        </Button>
      </GridToolbarContainer>
    );
  }

  

  

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const [assetrows, setAssetRows] = React.useState(initialRowsOfAssets);
  const [assetrowModesModel, setAssetRowModesModel] = React.useState({});


  useEffect(()=>{
    console.log("rows",rows)
  },[])

  useEffect(() => {
    setRows(initialRows);
    setAssetRows(initialRowsOfAssets)

  }, [initialRows,initialRowsOfAssets,show]);

 
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
  const [editOn,setEditOn]=useState(false);
  const handleEditClick = (id) => () => {
    if(!editOn && !addOn)
    {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      setEditOn(true);
    }
    else if(editOn){
      toast.warn("Already another edit action is running")
    }
    else{
      toast.warn("Add action is running,please save or close it");

    }
  };
  const handleEditClickOfAsset = (id) => () => {
    if(!editOn && !addOn)
    {
      setAssetRowModesModel({ ...assetrowModesModel, [id]: { mode: GridRowModes.Edit } });
      setEditOn(true);
    }
    else if(editOn){
      toast.warn("Already another edit action is running")
    }
    else{
      toast.warn("Add action is running,please save or close it");

    }
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setEditOn(false);
    setAddOn(false);
    toast.success("Record saved successfully")
  };
  const handleSaveClickOfAsset = (id) => () => {
    setAssetRowModesModel({ ...assetrowModesModel, [id]: { mode: GridRowModes.View } });
    setEditOn(false);
    setAddOn(false);
    toast.success("Record saved successfully")

  };

  const [open, setOpen] = React.useState(false);
  const [deleteId,setDeleteId]=useState();
  const [isSalesProfitDelete,setSalesProfitDelete]=useState(true);

  const handleClickOpen = (id,value) => () =>{
    if(!editOn && !addOn)
    {
      setOpen(true);
      setDeleteId(id);
      setSalesProfitDelete(value);
    }
    else if(editOn)
    {
      toast.warn("Edit action is running,Please save or close it")
    }
    else{
      toast.warn("Add action is running,Please save or close it")

    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleDeleteClick = () => {
    setRows(rows.filter((row) => row.id !== deleteId));
    handleClose();
    toast.success("Record deleted successfully");
  };
  const handleDeleteClickOfAsset = () => {
    setAssetRows(assetrows.filter((row) => row.id !== deleteId));
    handleClose();
    toast.success("Record deleted successfully");
  };
  

  const handleCancelClick = (id) => () => {
    setEditOn(false);
    setAddOn(false);
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
    setEditOn(false);
    setAddOn(false);
    setAssetRowModesModel({
      ...assetrowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = assetrows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setAssetRows(assetrows.filter((row) => row.id !== id));
    }
  };
  


  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };
  const processRowUpdateOfAsset = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setAssetRows(assetrows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowModesModelChangeOfAsset = (newRowModesModel) => {
    setAssetRowModesModel(newRowModesModel);
  };
  console.log(salesProfit[0],"today sales");
  const objectKeys = Object.keys(salesProfit[0] || []);
  function isNumber(value) {
    return typeof value === "number";
  }
  const columns1 = objectKeys?.map((key) =>
  {
    
    if
    (key=="P/L")
    {
      return{ field: "P/L", 
        headerName: "P/L", 
        type: "number",
        width: 180, 
        editable: true ,
        align: "left",
        headerAlign: "left",
        headerClassName: "super-app-theme--header",
       
        cellClassName: (params) => {
          if (params.value == null) {
            return "";
          }

          return clsx("super-app", {
            negative: params.value < 0,
            positive: params.value > 0,
          });
        },
        valueFormatter: (params) => {
          return Math.abs(params.value)
         
        },
      }


    }
    else if(key!="id" && key!="isNew")
    {
      return{
        field: key,
        headerName:key,
        width:180,
        align:"left",
        headerAlign:"left",
        editable:true,
        headerClassName: "super-app-theme--header",
        type:isNumber(salesProfit[0][key]) ? "number" :"string"
      };
    }
    else
      return null;
  }
  ).filter(Boolean);

  { role!="User" && columns1.push({
    headerClassName: "super-app-theme--header",

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
          <Tooltip title="save"><GridActionsCellItem
            icon={<SaveIcon sx={{color:"green"}}/>}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          /></Tooltip>,
          <Tooltip title="cancel"><GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          /></Tooltip>,
        ];
      }

      return [
        
        <Tooltip title="Edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          /></Tooltip>,
        <Tooltip title="Delete">
          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:"red"}}/>}
            label="Delete"
            onClick={handleClickOpen(id,true)}
            sx={{
              color: "red",
            }}
            color="inherit"
          /> 
        </Tooltip>
      ];
    },
  })}
  //setCol1(c1);

  //console.log("c1",c1);

  const c1 = [
    { field: "Product ID",
      headerName: "Product ID", 
      type: "number",width: 180,
      align: "left",     
      headerAlign: "left",
      editable: true ,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Product Name",
      headerName: "Product Name",
      width: 280,
      align: "left",
      headerAlign: "left",
      editable: true,
      hideable:false,
      headerClassName: "super-app-theme--header",

    },
    {
      field: "Sales Amount",
      headerName: "Sales Amount",
      type: "number",
      align: "left",
      headerAlign: "left",
      width: 180,
      editable: true,
      headerClassName: "super-app-theme--header",


    },
    {
      field: "Cost",
      headerName: "Cost",
      width: 180,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
      headerClassName: "super-app-theme--header",

    },
    { field: "P/L", 
      headerName: "P/L", 
      type: "number",
      width: 180, 
      editable: false ,
      align: "left",
      headerAlign: "left",
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => {
        return params?.row?.["Sales Amount"]-params?.row.Cost ;
      },
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          negative: params.value < 0,
          positive: params.value > 0,
        });
      },


    },
      

    {
      headerClassName: "super-app-theme--header",

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
            <Tooltip title="save"><GridActionsCellItem
              icon={<SaveIcon sx={{color:"green"}} />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            /></Tooltip>,
            <Tooltip title="cancel"><GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            /></Tooltip>,
          ];
        }

        return [
          <Tooltip title="Edit">
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            /></Tooltip>,
          <Tooltip title="Delete">
            <GridActionsCellItem
              icon={<DeleteIcon sx={{color:"red"}}/>}
              label="Delete"
              onClick={handleClickOpen(id,true)}

              color="inherit"
            /></Tooltip>,
        ];
      },
    },
  ];

  const Keys = Object.keys(assets[0] || []);
  const columns2 = Keys.map((key) => {
    if(key!="id" && key!="isNew")
    {
      return{ field: key,
        headerName: key, 
        width: 180,
        align: "left",     
        headerAlign: "left",
        editable: true ,
        headerClassName: "super-app-theme--header"
      }
    }
  }).filter(Boolean);
  //console.log(newArray,"new array assets")
  columns2.push({
    headerClassName: "super-app-theme--header",

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
          <Tooltip title="save"><GridActionsCellItem
            icon={<SaveIcon sx={{color:"green"}}/>}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClickOfAsset(id)}
          /></Tooltip>,
          <Tooltip title="cancel"><GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClickOfAsset(id)}
            color="inherit"
          /></Tooltip>,
        ];
      }

      return [
        <Tooltip title="Edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClickOfAsset(id)}
            color="inherit"
          /></Tooltip>,
        <Tooltip title="Delete">
          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:"red"}}/>}
            label="Delete"
            onClick={handleClickOpen(id,false)}
            sx={{color:"red"}}
            color="inherit"
          /></Tooltip>,
      ];
    },
  })

  const c2 = [
    { field: "Companies",
      headerName: "Companies", 
      width: 180,
      align: "left",     
      headerAlign: "left",
      editable: true ,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Shares ( % )",
      headerName: "Shares ( % )",
      width: 280,
      align: "left",
      headerClassName: "super-app-theme--header",

      headerAlign: "left",
      editable: true,
    },
    
    {
      headerClassName: "super-app-theme--header",

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
            <Tooltip title="save"><GridActionsCellItem
              icon={<SaveIcon sx={{color:"green"}}/>}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClickOfAsset(id)}
            /></Tooltip>,
            <Tooltip title="cancel"><GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClickOfAsset(id)}
              color="inherit"
            /></Tooltip>,
          ];
        }

        return [

          role==="Super Admin" && (
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClickOfAsset(id)}
              color="inherit"
            /> ),

          <GridActionsCellItem
            icon={<DeleteIcon sx={{color:"red"}}/>}
            label="Delete"
            onClick={handleClickOpen(id,false)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  useEffect(() => {
    if(rows.length>0 && assetrows.length>0)
    {
      const tempdata=
        {
          "Sales&Profit":rows,
          "Asset_allocation":assetrows
        }
      
      updateToStore(tempdata)
    }
    

  }, [rows,assetrows]);

  const pies=()=>{
    navigate("/piechart")
  }
  const profitLoss = ()=>{
    navigate("/barchart")
 
  }
  
  useEffect(()=>{
    if(assets){
      setShow(false)
    }
    else{
      setShow(true)
    }
  },[assets])


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton  sx={{color:"#615d6e"}} />

        <GridToolbarExport sx={{color:"#615d6e",}}/>
        { role=="Super Admin" && <EditToolbar sx={{color:"#615d6e",backgroundColor:"#615d6ed4"}}setRows={setRows} setRowModesModel={setRowModesModel} />}
        
        <GridToolbarDensitySelector sx={{color:"#615d6e"}}/>
      </GridToolbarContainer>
    );
  }

  const handleClickOfAsset = () => {
    if(!editOn && !addOn){
      const id = randomId();
      setAssetRows((oldRows) => [{ id, "Companies": "", "Shares ( % )": "",isNew: true }, ...oldRows]);
      setAssetRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "Companies" },
      }));
      setAddOn(true)

    }
    else if(editOn){
      toast.warn("Edit action is running,Please save or close it")
    }
    else{
      toast.warn("Already add action is running,Please save or close it")

    }
  };

  function assetCustomToolbar() {
    return (
      <GridToolbarContainer sx={{color:"#615d6e"}}>
        <GridToolbarColumnsButton sx={{color:"#615d6e"}} />

        <GridToolbarExport sx={{color:"#615d6e"}}/>
        <assetEditToolbar/>
        <Button  sx={{color:"#615d6e"}} startIcon={<AddIcon />} onClick={handleClickOfAsset}>
        Add record
        </Button>
        <GridToolbarDensitySelector sx={{color:"#615d6e"}}/>
      </GridToolbarContainer>
    );
  }


  const columnVisibilityModels = React.useMemo(() => {
    if (role === "Super Admin") 
    {
      return  {
        // "Product ID": true,
        // "Product Name": true,
        // "Sales Amount": true,
        // "Cost": true,
        // "P/L": true,
        // "actions": true
      };
    }
    else if(role =="Admin")
    {

    
      return {
        // "Product ID": true,
        // "Product Name": true,
        "Sales Amount": false,
        "Cost": false,
        // "P/L": true,
        // "actions": true
      };
    }
    else{
      return {
        "Product ID": false,
        //"Product Name": true,
        "Sales Amount": false,
        "Cost": false,
        //"P/L": true,
        //"actions": true
      };

    }
  }, [role]);

  

  return (  
    <> 
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really  want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={isSalesProfitDelete ? handleDeleteClick : handleDeleteClickOfAsset} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
      {show && 
      <div>
        <input type="file" style={{cursor: "pointer"}} onChange={handleFileChange} />
        <Button component="label" variant="contained" disabled={!selectedFile} onClick={handleUpload} startIcon={<CloudUploadIcon />}>
      Upload file

        </Button>
      </div>}
      
      {(salesProfit)?
        (
          <>
      
            <div className="got">
              <div className="title">Sales&Profit</div>
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
                  backgroundColor:"white",
                  "& .super-app-theme--header": {
                    backgroundColor: "#e5e5e5",
                    fontSize:20

                  },
                  "& .super-app.negative": {
                    //backgroundColor: "rgba(157, 255, 118, 0.49)",
                
                    color: "red",
                    fontWeight: "600",
                  },
                  "& .super-app.positive": {
                    // backgroundColor: "#d47483",
                    color: "green",
                    fontWeight: "600",
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
                    toolbar: CustomToolbar,
                  }
                  }
                
                  slotProps={{
                    toolbar: { setRows, setRowModesModel },
                  }}

                  onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                      event.defaultMuiPrevented = true;
                    }
                  }}

                  columnVisibilityModel={columnVisibilityModel}
                  onColumnVisibilityModelChange={(newModel) =>
                  {
                    if(role=="Admin")
                    {
                      newModel["Sales Amount"]=false;
                      newModel["Cost"]=false;
                    }
                    else if(role=="User")
                    {
                      newModel["Sales Amount"]=false; 
                      newModel["Cost"]=false;
                      newModel["Product ID"]=false;

                    }
                    console.log("new modal",newModel,role)
                    setColumnVisibilityModel(newModel);

                  }
                  }
                  //disableColumnSelector


                />
              </Box>
              <div className="btns"><button onClick={profitLoss} className="btn v2">Chart View</button></div>
            </div>
            <div className="got">
              <div className="title">Asset Allocation</div>
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

                  backgroundColor:"white",
                  "& .super-app-theme--header": {
                    fontSize:20,
                    backgroundColor: "#e5e5e5",


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
                    toolbar: assetCustomToolbar,
                  }}
                  slotProps={{
                    toolbar: { setAssetRows, setAssetRowModesModel },
                  }}
                  onCellDoubleClick={(params, event) => {
                    if (!event.ctrlKey) {
                      event.defaultMuiPrevented = true;
                    }
                  }}


                  columnVisibilityModel={assetsColumnVisibilityModel}
                  onColumnVisibilityModelChange={(newModel) =>
                    setAssetsColumnVisibilityModel(newModel)
                  }

                  //disableColumnSelector
                  

                />
              </Box>
              <div className="btns"><button onClick={pies} className="btn v2">Chart View</button></div>

            </div>
          </> ):!show&&<div className="loader-container">
          <l-bouncy
            size="45"
            speed="1.75" 
            color="#615d6e"
          ></l-bouncy>
        </div>
      }
    </>
    
  );
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
