const development = {
  key: "/url",
  testFetch: "date-remainder",
  get_Posts: "/posts",
  get_users: "/users",
  get_excelData:"/upload"
};

export function getAllEndpoints() {
  return Object.keys(development).reduce(function (acc, item) {
    acc[item] = development[item];
    return acc;
  }, {});
}

export function getBaseURL() {
<<<<<<< HEAD
 // return "https://63849a654ce192ac605d1206.mockapi.io/api/calendar/";
   return "http://localhost:8000";
  //return "https://excel-8dyl.onrender.com"
=======
  // return "https://63849a654ce192ac605d1206.mockapi.io/api/calendar/";
  return "http://localhost:3000";
>>>>>>> 52b0acb88030cf9c59fa2e73421a3a85a36dea51
}
