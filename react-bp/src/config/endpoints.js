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
  // return "https://63849a654ce192ac605d1206.mockapi.io/api/calendar/";
  return "http://localhost:3000";
  //return "https://excel-8dyl.onrender.com"
}
