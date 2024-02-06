import cloneDeep from "lodash/cloneDeep";
import { setNamespace, setApiError } from "Utilities/helpers";
import Network from "Utilities/network";
import axios from "axios";
import { toast } from "react-toastify";
import {  useCookies } from "react-cookie";


const namespace = "dashboard";
const createAction = setNamespace(namespace);
const nw = new Network();

// STORE
const initialState = {
  apiError: null,
  testData: null,
  excelData:null,
  users:null,
  currentUser:null
};

// ACTIONS
const ASSIGN_TO_DASHBOARD_STORE = createAction("ASSIGN_TO_DASHBOARD_STORE");
const RESET_DASHBOARD_STORE = createAction("RESET_DASHBOARD_STORE");
const POST_TO_DASHBOARD_STORE = createAction("POST_TO_DASHBOARD_STORE")


const assignToDashboardStore = (type, payload) => ({
  type: ASSIGN_TO_DASHBOARD_STORE,
  meta: {
    type,
    payload,
  },
});

const resetDashboardStore = () => (dispatch) => {
  dispatch({
    type: RESET_DASHBOARD_STORE,
    meta: {
      payload: null,
    },
  });
};

const postToDashboardStore = (type, payload) => ({
  type: POST_TO_DASHBOARD_STORE,
  meta: {
    type,
    payload,
  },
});

// METHODS
const getAllRequetUser = () => (dispatch) => {
  // dispatch(assignToDashboardStore("testData", null));
  return nw
    .api("testFetch")
    .get()
    .then((response) => {
      dispatch(assignToDashboardStore("testData", response?.data));
    })
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
};
const updateToStore = (data) => (dispatch) => {
  //axios.put("http://localhost:3000/excelData/1", data)
  return nw 
    .apiWithPath("get_excelData",[1])
    .put(data)
    .then(response => {
      console.log(response.data,"responese data today demo");
      dispatch(assignToDashboardStore("excelData", response?.data[0]));
      console.log("after ")

    })
    .catch(error => {
      console.error("Error uploading file: ", error);
    });
};




const updateUserToStore = (data,user) => (dispatch) => {
  axios.patch(`http://localhost:3000/users/${user}`,
    {
      "columnVisibility": data,
      
    }
  )
    .then(response => {
      console.log(response.data,"responese of patch ");
      dispatch(assignToDashboardStore("currentUser", response?.data));
      console.log("after ")

    })
    .catch(error => {
      console.error("Error uploading file: ", error);
    });
};

const updateUserToStoreForAssets = (data,user) => (dispatch) => {
  axios.patch(`http://localhost:3000/users/${user}`,
    {
      "assetsColumnVisibility": data,
      
    }
  )
    .then(response => {
      console.log(response.data,"responese of patch ");
      dispatch(assignToDashboardStore("currentUser", response?.data));
      console.log("after ")

    })
    .catch(error => {
      console.error("Error uploading file: ", error);
    });
};









const getReloadData = () => (dispatch) => {
  return nw
    .api("get_excelData")
    .get()
    .then(response => {
      console.log(response.data,"responese data get api");
      dispatch(assignToDashboardStore("excelData", response?.data));
    })
    // .catch(error => {
    //   console.error("Error uploading file: ", error);
    // });
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
};
const getReloadDataOfUsers = () => (dispatch) => {
  return nw
    .api("get_users")
    .get()
    .then(response => {
      console.log(response.data,"responese data get api  fore usersssssssssssssssssssss");
      dispatch(assignToDashboardStore("users", response?.data));
    })
    // .catch(error => {
    //   console.error("Error uploading file: ", error);
    // });
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
};

const getAllData = (data) => (dispatch) => {
  axios.post("https://excel-8dyl.onrender.com/upload", data,{
    headers: {
      "content-type": "multipart/form-data"
    }
  })
    .then(response => {
      console.log(response.data.data,"responese data");
      dispatch(assignToDashboardStore("excelData", response?.data.data));

      //axios.post("http://localhost:3000/excelData", response.data.data)
      // .then(response => {
      //   console.log(response.data.data,"responese data");
      //   dispatch(assignToDashboardStore("excelData", response?.data.data));
      //   console.log("after ")

      // })
      // .catch(error => {
      //   console.error("Error uploading file: ", error);
      // });
      return nw
        .api("get_excelData")
        .post(response.data.data)

     

    })
    .catch(error => {
      console.error("Error uploading file: ", error);
    });
};



const fetchLoginData = ()=> (dispatch)=>{
  return nw
    .api("get_users")
    .get()
    .then((response) => {
      dispatch(assignToDashboardStore("users", response?.data));
    })
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
}

const postData = (data)=> (dispatch)=>{
  return nw
    .api("get_users")
    .post(data)
    .then((response) => {
      dispatch(postToDashboardStore("users", response?.data));
    })
    .catch((error) => {
      setApiError(dispatch, assignToDashboardStore, error);
    });
}

const deleteAllData = ()=>()=>{
  //axios.delete("http://localhost:3000/excelData/1")
  return nw 
    .apiWithPath("get_excelData",[1])
    .delete()
  
}


//Use If need DB json
// const getAllRequetUser = () => (dispatch) => {
//   dispatch(assignToDashboardStore("get_Posts", null));
//   return nw
//     .api("get_Posts")
//     .get()
//     .then((response) => {
//       dispatch(assignToDashboardStore("testData", response?.data));
//     }).catch((error) => {
//       setApiError(dispatch, assignToDashboardStore, error);
//     });
// };

// Routing

// Reducers
const dashboardReducer = (state = initialState, action) => {
  const localState = cloneDeep(state);
  switch (action.type) {
  case ASSIGN_TO_DASHBOARD_STORE:
    localState[action.meta.type] = action.meta.payload;
    return { ...localState };
  case RESET_DASHBOARD_STORE:
    return initialState;
  case POST_TO_DASHBOARD_STORE:
    localState[action.meta.type].push(action.meta.payload)
    return{...localState}
  default:
    return localState;
  }
};

export default {
  namespace,
  store: initialState,
  reducer: dashboardReducer,
  creators: {
    assignToDashboardStore,
    resetDashboardStore,
    getAllRequetUser,
    getAllData,
    fetchLoginData,
    postData,
    getReloadData,
    updateToStore,
    deleteAllData ,updateUserToStore ,getReloadDataOfUsers ,
    updateUserToStoreForAssets
  },
};
