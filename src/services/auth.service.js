import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8000/api/";
// const API_URL = "https://equanimityolympiad.in/api/";


const register = (token,data) => {
  return axios.post(API_URL + "signup/v1/register", {
 
    ...data,
 
  },
  {
    headers:{
      token : token,
    }
  }

  );
};

const loginGuest = (data) => {
  return axios.post(API_URL + "signup/v1/loginGuest", {
 
    ...data,
 
  },
  );
};
const genrateOtp = (phone) => {
  return axios.post(API_URL + "signup/v1/genrateOtp", {
    phone
  });
};

const verifyOtp = (data) => {
  return axios.post(API_URL + "signup/v1/verifyOtp", {
    ...data
  });
};



const login = (username, password) => {
  return axios
    .post(API_URL + "auth/v1/login", {
      username,
      password,
    })
};

const forgetUserName = (phone) => {
  return axios
    .post(API_URL + "auth/v1/username", {
     phone
    })
};

const school = (code) => {
  return axios
    .get(API_URL + "signup/v1/school/" + code)
};

const userSchool = () => {
  if(!authHeader().key) return false;
  return axios
    .get(API_URL + "signup/v1/userSchool/"  ,
    {
      headers:authHeader(),
    })
};

const editSchool = (code) => {
  return axios
    .post(API_URL + "signup/v1/school" ,{
      school_name  : code
    },
    {
      headers:authHeader(),
    })
};



const getUserName = (phone,otp) => {
  if(!authHeader().key) return false;

  return axios
    .post(API_URL + "auth/v1/getUsername", {
     otp,
     phone
    })
};

const forgetPassword = (username) => {
  return axios
    .post(API_URL + "auth/v1/forgotPassword", {
     username
    })
};
const resetPassword = (username,otp,password) => {
  console.log(username);
  return axios
    .post(API_URL + "auth/v1/resetPassword", {
      username,
     otp,
     password
    })
};


const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

const authService = {
  register,
  loginGuest,
  login,
  logout,
  genrateOtp,
  verifyOtp,
  forgetPassword,
  forgetUserName,
  getUserName,
  resetPassword,
  school,
  userSchool,
  editSchool,
};

export default authService;
