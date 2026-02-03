export const endpoints = {
  // login
  LOGIN: "/user/login",
  REGISTER: "/user/register",

  //user endpoints
  GET_USERS: "/user",
  USER_DELETE: "/user/:id",

  //donation endpoints
  GET_DONATION: "/donations",
  CREATE_DONATION: "/donations/create",
  GET_DONATION_CHART: "/donations/chart-data",

  //request endpoints
  GET_REQUESTS: "/request",
  CREATE_REQUEST: "/request/create",
};
