import React, {useEffect } from "react";
import {useSelector} from 'react-redux';
import useViewport  from '../hooks/Viewport';
import SignupMobile from './SignupMobile'
import Signup from './Signup'
import { Navigate } from "react-router-dom";

import LoginBar from './LoginBar'
import MainBanner from './MainBanner'

let width;

const Home = () => {
   width = useViewport();
   width = width.width;
  let user = useSelector(state => state.auth);
  user = user?.user;

  let state = useSelector(state => state.auth)

  const breakpoint = 620;
  useEffect(() => {

  }, []);
  if(user && !state.isGuest) {
    if(user.id){
      return <Navigate to="/dashboard" />;
    } 
    else{
      return <Navigate to="/profile" />;
      
    }

  }

  const Layout = function (){
    return (
      <>
        <div className="main-signup">
          <Signup/>
        </div>
      </>
   
    
    )
  
  }
  return (
    <div className="homepage">
      <Layout/>
    </div>
  );
};

export default Home;
