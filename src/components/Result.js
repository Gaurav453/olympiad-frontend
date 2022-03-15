import React , { useEffect,useState } from "react";
import logo from '../assets/images/Logo009_min2.png';
import what from '../assets/images/WhatsApp.svg.png';
import {useSelector ,useDispatch } from 'react-redux';

import { saveAs } from 'file-saver'

import { Link } from "react-router-dom";

import face from '../assets/images/facebook.png';


import imag from '../assets/images/try_again.jpg';


const Result = (props) => {
    let score = localStorage.getItem('score');
    console.log(score);
    let guest = localStorage.getItem('guest');
    // if(guest === 'true'){
    //     localStorage.clear();
    // }

    let user = useSelector(state => state.auth);
    let state = useSelector(state => state.auth);
    user = user?.user;
    console.log(user)
    score = JSON.parse(score);
    let link = score.certificate_link;
    score = score.score
    localStorage.removeItem('language')


    const download = href => {
        console.log(href);
        fetch(href, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "certificate.png"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };
    return(
        <div className="result">
            <div className="row" >
                <div className="col logo-result" >
                    <div>
                        <img alt="logo" src={logo} ></img>
                        <div className="text" >Thank You For Attempting Olympiad!</div>
                
                    </div>
                    </div>

            </div>
            <div style={{alignItems: 'center'}}  className="row" > 
               
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
                            <p>Unanswered</p>
                        </div>



                        </div>

                    </div>
                    <div className="break" >

                    </div>
                    <div style={{alignItems: 'center'}} className="share row" >
                        <div style={{marginBottom:"15px"}} className="col-xs-12 col-sm-12 col-md-6 col-lg-6 now d-flex justify-content-center" >
                            <div>
                                <span>Share On:</span>
                                <img  alt="whatsapp" src={what} ></img>
                                <img  alt="facebook" src={face} ></img>


                            </div>
                           
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 attempt d-flex justify-content-center" >
                        <Link to={state.isGuest ? '/' : "/dashboard"}> Attempt Again </Link>

                        </div>

                    </div>

                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-5  " >
                    {
                        link ? 
                        <div className="passed btnn" >

                        <img style={{marginBottom : 20 + 'px'}} alt="try-again" src={link} ></img>
                        <button onClick={() => download(link)} >
                            Download Certificate
                        </button>
                   

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