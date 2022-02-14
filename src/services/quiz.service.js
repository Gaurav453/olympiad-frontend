import axios from "axios";
import authHeader from "./auth-header";
//http://localhost:8000

// const API_URL = "http://localhost:8000/api/quiz/v1/";
const API_URL = "http://localhost:8000/api/quiz/v1/";

const getPreviousAttempts = () => {
  return axios.get(API_URL + "previousAttempts",
  {
    headers:authHeader()
  }

  );
};
const currentAttempt = () => {
  return axios.get(API_URL + "currentAttempt",
  {
    headers:authHeader(),
  }

  );
};

const getQuestion = (data) => {
  return axios.post(API_URL + "question",
  data,
  {
    headers:authHeader(),
  }

  );
};
const saveAnswer = (data) => {
  return axios.post(API_URL + "saveAnswer",
  data,
  {
    headers:authHeader(),
  }

  );
};
const submitQuiz = (data) => {
  return axios.post(API_URL + "submitQuiz",
  data,
  {
    headers:authHeader(),
  }

  );
};

const saveRemainingTime = (data) => {
  return axios.post(API_URL + "saveRemainingTime",
  data,
  {
    headers:authHeader(),
  }

  );
};

const quizService = {
  getPreviousAttempts,
  currentAttempt,
  getQuestion,
  saveAnswer,
  submitQuiz,
  saveRemainingTime
  
};

export default quizService;
