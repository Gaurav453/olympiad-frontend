import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";
// const API_URL = "https://equanimityolympiad.in/api/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const buildProfile = (body) => {
  return axios.post(API_URL + "signup/v1/buildProfile",{
    ...body
  } ,{ headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  buildProfile,
  getModeratorBoard,
  getAdminBoard,
};

export default userService