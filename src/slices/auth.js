import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let user  = localStorage.getItem("user");
let token  = localStorage.getItem("token");
if(user) user = JSON.parse(user);
if(token) token = JSON.parse(token);


export const genrateOtp = createAsyncThunk(
  "auth/genrateOtp",
  async ({phone}, thunkAPI) => {
    try {
      const response = await AuthService.genrateOtp(phone);
      thunkAPI.dispatch(setMessage(response.data.message));
      toast.success(response.data.StatusMsg, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return response.data;
    } catch (error) {
      
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (dataObj, thunkAPI) => {
    try {
      const response = await AuthService.verifyOtp(dataObj);
      thunkAPI.dispatch(setMessage(response.data.message));
      toast.success(response.data.StatusMsg, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({verifyOtpToken,dataObj}, thunkAPI) => {
    try {
      const response = await AuthService.register(verifyOtpToken,dataObj);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveProfile = createAsyncThunk(
  "auth/saveProfile",
  async (data, thunkAPI) => {
    try {
      const response = await UserService.buildProfile(data);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(userName, password);
      return data.data;
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const forgetUserName = createAsyncThunk(
  "auth/forgetUserName",
  async ({ phone }, thunkAPI) => {
    try {
      const data = await AuthService.forgetUserName(phone);
      return data.data;
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUserName = createAsyncThunk(
  "auth/getUserName",
  async ({ phone,otp }, thunkAPI) => {
    try {
      const data = await AuthService.getUserName(phone,otp);
      return data.data;
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async ({ userName }, thunkAPI) => {
    try {
      const data = await AuthService.forgetPassword(userName);
      return data.data;
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ userName,password,otp }, thunkAPI) => {
    try {
      const data = await AuthService.resetPassword(userName,otp,password);
      return data.data;
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const loginGuest = createAsyncThunk(
  "auth/loginGuest",
  async (dataObj, thunkAPI) => {
    try {
      const response = await AuthService.loginGuest(dataObj);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const school = createAsyncThunk(
  "profile/school",
  async ({code}, thunkAPI) => {
    try {
      const response = await AuthService.school(code);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);


export const userSchool = createAsyncThunk(
  "profile/userSchool",
  async ({}, thunkAPI) => {
    try {
      const response = await AuthService.userSchool();
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const editSchool = createAsyncThunk(
  "profile/editSchool",
  async ({code}, thunkAPI) => {
    try {
      const response = await AuthService.editSchool(code);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      toast.error(error.response.data.errMessage, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);




export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const isProfileCompleted = user?.email ? true : false
if(token) 
  user["token"] = token;
const initialState = user
  ? { isLoggedIn: true ,user , isProfileCompleted}
  : { isLoggedIn: false, user: null ,isProfileCompleted };

const authSlice = createSlice({
  name: "auth",
  initialState,
reducers: {
        reset: () => initialState
    },
  extraReducers: {

    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isGuest = false;
      state.user = action.payload.data.user;
      state.isProfileCompleted = action.payload.data.user.email ? true : false
      localStorage.setItem('user',JSON.stringify(action.payload.data.user));
      localStorage.setItem('token',JSON.stringify(action.payload.data.token));
      localStorage.setItem('guest','false');

      

    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.isProfileCompleted = false;
    },
    [loginGuest.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isGuest = true;
      state.user = action.payload.data;
      state.isProfileCompleted = true;
      localStorage.setItem('user',JSON.stringify(action.payload.data));
      localStorage.setItem('token',JSON.stringify(action.payload.data.token));
      localStorage.setItem('guest','true');

    },
    [loginGuest.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.isProfileCompleted = false;
    },

    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
    [register.fulfilled]: (state,action) => { 
      state.isLoggedIn = true;
      state.isGuest = false;
      state.user = action.payload.data;
      state.isProfileCompleted = false
      localStorage.setItem('user',JSON.stringify(action.payload.data));
      localStorage.setItem('token',JSON.stringify(action.payload.data.token));
      localStorage.setItem('guest','false');


    },
    [saveProfile.fulfilled]: (state,action) => { 
      state.user = 
      { ...state.user,
        ...action.payload.data }
      state.isProfileCompleted = true;
      localStorage.setItem('user',JSON.stringify(action.payload.data));

    }
  },
});
const { reducer } = authSlice;
export default reducer;
