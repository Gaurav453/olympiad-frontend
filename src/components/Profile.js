import React, { useEffect } from "react";
import useViewport  from '../hooks/Viewport';
import ProfilePage from './ProfilePage'
import {useSelector} from 'react-redux';
import { Navigate } from "react-router-dom";


import LoginBar from './LoginBar'
import MainBanner from './MainBanner'




const Profile = () => {
  const { width } = useViewport();
  let user = useSelector(state => state.auth);
  user = user?.user;

  const breakpoint = 620;
  useEffect(() => {

  }, []);
  if(user) {
    if(user.email){
      return <Navigate to="/dashboard" />;
    } 
  }
  else{
      return <Navigate to="/" />;

  }

  const Layout = function (){
    if(width <= breakpoint ){
      return (
        <div className="row">
          <div className="col" >
            <ProfilePage/>
          </div>
        </div>
      )
    } 
    else return (
      <div>
      <div className="row">
        <div className="col">
          <LoginBar login={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <MainBanner/>
        </div>
        <div className="col-4">
          <ProfilePage/>
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

export default Profile;
