import React, { useEffect } from "react";
import useViewport  from '../hooks/Viewport';
import UniversityRegistrationPage from './UniversityRegistrationPage'
import {useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";


import LoginBar from './LoginBar'
import MainBanner from './MainBanner'




const UniversityRegistration = () => {
  const { width } = useViewport();

  const breakpoint = 620;
  useEffect(() => {

  }, []);

  const Layout = function (){
    if(width <= breakpoint ){
      return (
        <div className="row">
          <div className="col" >
            <UniversityRegistrationPage/>
          </div>
        </div>
      )
    } 
    else return (
      <div>
      <div className="row">
        <div className="col">
          <LoginBar login={"none"} />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <MainBanner/>
        </div>
        <div className="col-4">
          <UniversityRegistrationPage/>
        </div>
      </div>
      </div>
   
    
    )
  
  }
  return (
    <div className="homepage">
      <Layout/>
    </div>
  );


};

export default UniversityRegistration;
