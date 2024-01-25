import { upload } from "@testing-library/user-event/dist/upload";
import { cloneDeep } from "lodash";
import React, { useContext, useEffect ,useState} from "react";
import RefContext from "Utilities/refContext";
import {Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./upload.css"


const Upload = () => {
  const navigate= useNavigate();
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser ,getAllData} = actions;
  const { testData } = store;
  useEffect(() => {
    //getAllRequetUser();
  }, []);
  useEffect(() => {
    //console.log(testData, "items");
  }, [testData]);
  // console.log(ctx, "ctx");


  useEffect(() => {
    console.log(store, "store values");
  }, [store]);

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
    navigate("/chart")


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


  return (<div className="diff">
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUpload}>Upload Excel</button>
  </div>);
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
