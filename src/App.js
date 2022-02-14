import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Result from "./components/Result";



import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  useEffect(() => {

  }, );

  return (
    <Router>
      <div id="app" >
        <div className="">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/quiz" element={<Quiz />} />
            <Route exact path="/result" element={<Result />} />




        
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </Router>
  );
};

export default App;
