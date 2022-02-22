import React , { useEffect,useState } from "react";
import logo from '../assets/images/Logo009_min2.png';
import what from '../assets/images/WhatsApp.svg.png';
import {useSelector ,useDispatch } from 'react-redux';

import { Link } from "react-router-dom";

import face from '../assets/images/facebook.png';


import imag from '../assets/images/try_again.jpg';


const Result = (props) => {
    let score = localStorage.getItem('score');
    let user = useSelector(state => state.auth);
    let state = useSelector(state => state.auth);
    user = user?.user;
    console.log(user)
    score = JSON.parse(score);
    localStorage.removeItem('language')

    return(
        <div className="result">
            <div className="row" >
                <div className="col logo-result" >
                    <div>
                        <img alt="logo" src={logo} ></img>
                        <div className="text" >Thank You For Attempting The Olympiad!</div>
                
                    </div>
                    </div>

            </div>
            <div  className="row" > 
               
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 " >
                    <div className="name" >
                        {user.first_name}   {user.last_name} 
                    </div>
                    <div className="score row" >
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-5" >
                            <div className="circle">
                                <div className="first" >
                                    <span>{score.percentage}</span>
                                    
                                </div>
                                <p style={{fontSize:32+'px'}} >Score</p>
                            </div>
                          

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
                            <div className="circle">

                                <div className="second" >
                                <span>{score.correct}</span>



                                </div>
                                <p>Correct</p>
                            </div>


                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
                            <div className="circle">
                                <div className="third" >
                                <span>{score.incorrect || 0}</span>

                                    
                                </div>
                                <p>Incorrect</p>
                            </div>
                    


                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
                        <div className="circle" >
                            <div className="fourth" >
                            <span>{score.unAnswered}</span>
                            </div>
                            <p>unansweredwered</p>
                        </div>



                        </div>

                    </div>
                    <div className="break" >

                    </div>
                    <div style={{alignItems: 'center'}} className="share row" >
                        <div style={{marginBottom:"15px"}} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 now" >
                            <span>Share On:</span>
                            <img  alt="whatsapp" src={what} ></img>
                            <img  alt="facebook" src={face} ></img>


                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 attempt" >
                        <Link to={state.isGuest ? '/' : "/dashboard"}> Attempt Again </Link>

                        </div>

                    </div>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5 " >
                    {
                        true || props.isPassed ? 
                        <div className="tryAgain" >
                        <img style={{marginBottom : 20 + 'px'}} alt="try-again" src={imag} ></img>
                        <div>
                        <div className="attempt" >

                        </div>                        </div>

                    </div>  : 
                        <div className="tryAgain" >
                            <img  alt="try-again" src={imag} ></img>
                            <div>
                                We are sorry to inform you that your score is below the minimum criteria to get a certificate.
                            </div>

                        </div> 

                    }
                   
                </div>

            </div>

            
        </div>
    )

}

export default Result;