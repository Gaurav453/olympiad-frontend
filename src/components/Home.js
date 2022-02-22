import React, {useEffect } from "react";
import {useSelector} from 'react-redux';
import useViewport  from '../hooks/Viewport';
import SignupMobile from './SignupMobile'
import SignupDesktop from './SignupDesktop'
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
    if(user.email){
      return <Navigate to="/dashboard" />;
    } 
    else{
      return <Navigate to="/profile" />;
      
    }

  }

  const Layout = function (){
    if(width <= breakpoint ){
      return (
        <div className="row">
          <div className="col" >
            <SignupMobile/>
          </div>
        </div>
      )
    } 
    else return (
      <>
      <div className="row">
        <div className="col">
          <LoginBar isHome={true} />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <MainBanner/>
        </div>
        <div className="col-4">
          <SignupDesktop/>
        </div>
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
