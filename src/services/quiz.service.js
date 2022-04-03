import axios from "axios";
import authHeader from "./auth-header";
//http://localhost:8000

// const API_URL = "http://localhost:8000/api/quiz/v1/";
const API_URL = "https://equanimityolympiad.in/api/quiz/v1/";

const getPreviousAttempts = (sort) => {
  if(!authHeader().key) return false;

  console.log(sort);
  return axios.get(API_URL + "previousAttempts?sort=" + sort,
  {
    headers:authHeader()
  }

  );
};
const currentAttempt = () => {
  if(!authHeader().key) return false;

  return axios.get(API_URL + "currentAttempt",
  {
    headers:authHeader(),
  }

  );
};

const activeAttempts = () => {
  if(!authHeader().key) return false;

  return axios.get(API_URL + "activeAttempts",
  {
    headers:authHeader(),
  }

  );
};
const getQuestion = (data) => {
  if(!authHeader().key) return false;

  return axios.post(API_URL + "question",
  data,
  {
    headers:authHeader(),
  }

  );
};
const saveAnswer = (data) => {
  if(!authHeader().key) return false;

  return axios.post(API_URL + "saveAnswer",
  data,
  {
    headers:authHeader(),
  }

  );
};
const submitQuiz = (data) => {
  if(!authHeader().key) return false;

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
const performance = () => {
  if(!authHeader().key) return false;

  return axios.get(API_URL + "performance",
  {
    headers:authHeader(),
  }

  );
};

const customMessage = (attempt_id) => {
  if(!authHeader().key) return false;

  return axios.get(API_URL + "customMessage/" +attempt_id,
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
  saveRemainingTime,
  performance,
  activeAttempts,
  customMessage
  
};

export default quizService;
