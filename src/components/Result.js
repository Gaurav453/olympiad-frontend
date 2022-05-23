import React , { useEffect,useState } from "react";
import logo from '../assets/images/Logo009_min2.png';
import what from '../assets/images/WhatsApp.svg.png';
import tele from '../assets/images/telegram.png';
import {useSelector ,useDispatch } from 'react-redux';

import { customMessage } from '../slices/quiz'


import { Link } from "react-router-dom";

import face from '../assets/images/facebook.png';


import imag from '../assets/images/try_again.jpg';


const Result = (props) => {
    let score = localStorage.getItem('score');
    score=JSON.parse(score)
    console.log(score);


    let user = useSelector(state => state.auth);
    let state = useSelector(state => state.auth);

    let [message , setMessage] = useState("")
    const dispatch = useDispatch();
    user = user?.user;
    console.log(user)
    let link = score.certificate_link;
    localStorage.removeItem('language')

    useEffect(() => {
        console.log(score.id);
        dispatch(customMessage({attempt_id : score.id}))
        .unwrap()
        .then(res => {
            if(res){
                setMessage(res.data.text);
            }
            else{
                
            }
        })
    },[])

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
                <div className="col-12 answerKey">
            Hi {user.first_name}   {user.last_name}, {message} 
        </div>
               

            </div>
            <div style={{alignItems: 'center'}}  className="row" > 
             
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7 " >
                    <div className="name" >
                        {/* {user.first_name}   {user.last_name} */}
                    </div>
                    <div className="score row" >
                        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" >
                            <div className="circle">
                                <div className="first" >
                                    <span>{score.score}</span>
                                    
                                </div>
                                <p style={{fontSize:32+'px'}} >Score</p>
                            </div>
                          

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
                            <div className="circle">

                                <div className="second" >
                                <span>{score.easy_correct+score.medium_correct + score.difficult_correct}</span>



                                </div>
                                <p>Correct</p>
                            </div>


                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2" >
                            <div className="circle">

                                <div className="second fifth" >
                                <span>{score.partial_correct}</span>



                                </div>
                                <p>Partial Correct</p>
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
                              
                                <a className="share-link" href='https://api.whatsapp.com/send/?text=Hi!%20Let%20us%20pause%20from%20our%20daily%20grind%20for%20just%2015%20minutes%20to%20reflect%20on%20ourselves%20and%20reinforce%20positivity%20within%20us.%20I%20recently%20gave%20Humanity%20Olympiad%20and%20trust%20me%20its%20worth%20a%20try!%20I%20urge%20you%20to%20attempt%20this%20unique%20olympiad%20at%20least%20once.%20This%20is%20open%20for%20all%20not%20just%20students%20but%20any%20one%20can%20give%20this%20exam%20for%20free!%20Remember%20Nothing%20is%20more%20valuable%20than%20morals,%20ethics%20and%20Humanity%20in%20this%20world%20Taking%20part%20in%20this%20morals-based%20Humanity%20Olympiad%20will%20bring%20you%20closer%20to%20the%20world%20of%20virtues%20and%20will%20help%20you%20become%20a%20better%20person...%20Attempt%20now%20at%20www.humanityolympiad.org&app_absent=0' target='_blank'><img  alt="whatsapp" src={what} ></img></a>
                                <a className="share-link" href='https://www.facebook.com/humanityolympiad' target='_blank'><img  alt="facebook" src={face} ></img></a>
                                <a  className="share-link" href='https://t.me/internationalhumanityolympiad' target='_blank'><img  alt="facebook" src={tele} ></img></a>


                            </div>
                           
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 attempt d-flex justify-content-center atb" >
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

     
        <div className="answerKey">
                Answer key will be released on 7th September 2022
                </div>
               
            
        </div>
    )

}

export default Result;