import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import QuizService from "../services/quiz.service";
import AuthService from "../services/auth.service";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



let user  = localStorage.getItem("user");
let token  = localStorage.getItem("token");
if(user) user = JSON.parse(user);
if(token) token = JSON.parse(token);


export const getPreviousAttempts = createAsyncThunk(
  "quiz/previousAttempt",
  async ({sort},thunkAPI) => {
    try {
      const response = await QuizService.getPreviousAttempts(sort);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();

        
     
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);
export const currentAttempt = createAsyncThunk(
  "quiz/currentAttempt",
  async ({},thunkAPI) => {
    try {
      const response = await QuizService.currentAttempt();
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data.data;
    } catch (error) {
      console.log(error)
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);
export const activeAttempts = createAsyncThunk(
  "quiz/activeAttempts",
  async ({},thunkAPI) => {
    try {
      const response = await QuizService.activeAttempts();
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data.data;
    } catch (error) {
      console.log(error)
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);

export const getQuestion = createAsyncThunk(
  "quiz/question",
  async (data, thunkAPI) => {
    try {
      const response = await QuizService.getQuestion(data);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();   
    }
  }
);

export const getAllQuestions = createAsyncThunk(
  "quiz/allQuestion",
  async (data, thunkAPI) => {
    try {
      const response = await QuizService.getAllQuestions(data);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();   
    }
  }
);
export const saveAnswer = createAsyncThunk(
  "quiz/saveAnswer",
  async (data, thunkAPI) => {
    try {
      const response = await QuizService.saveAnswer(data);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);
export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async (data, thunkAPI) => {
    try {
      const response = await QuizService.submitQuiz(data);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);

export const saveRemainingTime = createAsyncThunk(
  "quiz/saveRemainingTime",
  async (data, thunkAPI) => {
    try {
      const response = await QuizService.saveRemainingTime(data);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);

export const performance = createAsyncThunk(
  "quiz/performance",
  async ({}, thunkAPI) => {
    try {
      const response = await QuizService.performance();
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
      console.log(error.response.data.errCode);
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      thunkAPI.dispatch(setMessage(message));

      return thunkAPI.rejectWithValue();    }
  }
);

export const customMessage = createAsyncThunk(
  "quiz/customMessage",
  async ({attempt_id}, thunkAPI) => {
    try {
      const response = await QuizService.customMessage(attempt_id);
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
      if(error.response.data.errCode === 400 && error.response.data.errMessage ==  "Access is denied")
        await AuthService.logout();
      return thunkAPI.rejectWithValue();    }
  }
);





const initialState = {

}

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  extraReducers: {

  },
});

const { reducer } = quizSlice;
export default reducer;
