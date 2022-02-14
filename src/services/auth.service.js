import axios from "axios";

// const API_URL = "http://localhost:8000/api/";
const API_URL = "http://localhost:8000/api/";


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

const logout = () => {
  localStorage.removeItem("user");
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
  genrateOtp,
  verifyOtp
};

export default authService;
