import React , { useEffect,useState ,useRef} from "react";
import {useSelector ,useDispatch } from 'react-redux';
import { Link, Navigate } from "react-router-dom";
import { currentAttempt,getQuestion,saveAnswer,submitQuiz,saveRemainingTime,getAllQuestions } from '../slices/quiz'
import Modal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

import logo from '../assets/images/Logo009_min2.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useTimer } from 'react-timer-hook';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding : "20px",
      borderRadius : "15px",
      marginRight : "37%",
    },
  };

  const override = `
  position: relative;
  width: 100px;
  height: 100px;
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  /* margin-top: 15%; */
  /* margin-bottom: 27%; */
  margin-left: auto;
  margin-right: auto;
  margin: auto;
  margin-top: 15%;
`;
let initialized = false

const Quiz = () => {
    const testDivRef = useRef(null);
    let timer;

    let set = 0;
    // Modal.setAppElement('#quiz');
 
    let initializeGrid = () => {
        let gridArr = {}
        for(let i=1; i<=25; i++){
            gridArr[i] = {
                id : i,
                isOpened: false,
                isReviewd : false, 
                answer : "",
                question : 0
        
            }
        }
        setGrid(gridArr)
    }

  let user = useSelector(state => state.auth);
  user = user?.user;
  const dispatch = useDispatch();
  const navigae = useNavigate()
  const [attempt,setAttempt] =  useState("");
  const [grid,setGrid] =  useState([]);
  const [current , setCurrent ] = useState(1);
  const [question , setQuestion ] = useState(false);
  const [answer , setAnswer ] = useState([]);
  const [initialTime , setITime] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isSubmitted, setSubmitted] = React.useState(false);
  let [option , setOption] = useState([])


  let [questions, setQuestions] = useState([])
  let [answers, setAnswers] = useState({});


  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({  expiryTimestamp : new Date(), onExpire: () => handleSubmit() });



  const [loading , setLoading ] = useState(false);
  const [mainLoader , setMainLoader ] = useState(true);



  function closeModal() {
    setIsOpen(false);
  }
  
  useEffect(() =>{
      if(loading && isRunning){
          pause();

      }
      else if(!isRunning && initialized){
          console.log('timer stated');
        //   start();
      }

  },[loading])

let interval;

let initialize = () => {
    setMainLoader(true)
    if(  localStorage.getItem("attempt_id")){
        setAttempt(localStorage.getItem("attempt_id"));
        setQuestions((JSON.parse(localStorage.getItem("questions"))));
        setAnswers((JSON.parse(localStorage.getItem("answers"))));
        setGrid((JSON.parse(localStorage.getItem("grid"))));
        setCurrent(((localStorage.getItem("current"))));



        

        const time = new Date();
        time.setSeconds(time.getSeconds() + parseInt(localStorage.getItem('remaining_time')));
        restart(time);
        setLoading(false)
        setMainLoader(false)
        initialized =  true;



    }
    else{
        dispatch(getAllQuestions({language : localStorage.getItem('language')}))
    .unwrap()
    .then(res => {
        if(res){
          initialized =  true;
          setAttempt(res.data.attempt_id);
          setQuestions(res.data.questions)
          localStorage.setItem("questions", JSON.stringify(res.data.questions));
          localStorage.setItem("attempt_id", res.data.attempt_id);

          setCurrent(1)
          setLoading(false)
          setMainLoader(false)
          const time = new Date();
          localStorage.setItem('remaining_time',900)
          time.setSeconds(time.getSeconds() + 900);
          restart(time);
        }
 
    })
    }
    
}

useEffect(()=>{
    let time = 0;
    if(minutes > 0){
        time += minutes*60;

    }
    time += seconds;
    
    if(time % 2 === 0){
        if(initialized)
            saveRemaining(time);
    }
    else{
    }


},[seconds,minutes])



let setOptions = function(question){
    let temp =  answer || []
    let arr =[]
    let optionRegex = /c[0-9]/;
    for(let key in question){
        if(optionRegex.test(key)){
            arr.push({
                text : question[key].o,
                url : question[key].url,
                value : key,
                index : parseInt(key.substring(1)),
                isSelected : temp.includes(key) ? true : false
            })
        }
    }
    shuffleArray(arr)
    setOption(arr);

}

let gridElementClass = function(element){
  if(!element.answer && !element.isReviewd && !element.question && element.id !== current){
      return "grid-element"
  }
  else if(element.id === current){
      return "current grid-element"
  }
  else if(element.isReviewd){
      return "reviewed grid-element"
  }
  else if(element.answer){
      return "answered grid-element"
  }
  else if(element.question){
      return "opened grid-element"

  }

}
let handleChange = (entry) => {
        handleSave();
        setCurrent(entry.id);
    
      try{
      testDivRef.current.scrollIntoView(); 

      }
      catch(e){
          
      }
  }


  useEffect(() => {
    setMainLoader(true);
    initializeGrid();
    initialize();
  },[]); 

  useEffect(() => {
    setQuestion(questions[current-1]);
    setOptions(questions[current-1]);
    setAnswer(answers[current]);

    if(grid[current]){
        let tempGrid = {}
        tempGrid[current] = {
            ...grid[current],
            isOpened : true,
    
    
        }
        setGrid(prev => {
           return { 
            ...prev,
            ...tempGrid
           } 
        });
    }
   
    
  },[current,questions,setQuestions])



  if(!user){
    return <Navigate to="/" />;

  }
  else if(!user.id)
    return <Navigate to="/profile" />;
  else if(!localStorage.getItem('language'))
      navigae('/dashboard')


 var saveRemaining = (time) => {
    if(!initialized ) return
    if(!attempt) return;
    localStorage.setItem("remaining_time" ,time )
    saveAnswers()
 }
    var saveAnswers = () =>{
        localStorage.setItem('answers',JSON.stringify(answers))
        localStorage.setItem('grid',JSON.stringify(grid))
        localStorage.setItem('current',(current))


    }


  const GridDiv = function() {
      return <div className="grid" >
          <div className="row row-cols-5" >
              {
                  Object.keys(grid).map(e =>{
                    let entry  = grid[e];
                      return <div key={entry.id} className="col">
                            <div onClick={() => handleChange(entry)} className={gridElementClass(entry)} >
                                {entry.id}
                            </div>
                          </div>
                  })
              }

          </div>

      </div>
  }

  let optionClass = function(element){
      if(answer?.includes(element.value)){
          return "selected answerBlock"
      }
      else{
          return "answerBlock "
      }
  }

  let selectOption =  function({value}){
    // console.log(value)
    let temp = answer || [];
    if(temp.includes(value)){
        temp.splice(temp.indexOf(value),1);
    }
    else{
        temp.push(value);
    }
    console.log(temp);
    setAnswer([...temp])
  }


  let shuffleArray = (array,order) => {
      let r = []
      let k = 0
    for (var i = array.length - 1; i > 0; i--) {
        var j;
        if(order){
            j = order[k]
        }
        else{
            j = Math.floor(Math.random() * (i + 1));
        }
        r.push(j);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        k++;
    }
    return r;
}
  let Option = function(){
    return option.map((element,i) => {
        return <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                <p style={{textAlign: "center"}} > <strong>{String.fromCharCode(65 + i)}</strong></p>
                
                <div key={element.index} onClick={() => selectOption(element)} className={optionClass(element)}>
           <div className="a-img">
                <img alt="answer" src={element.url} ></img>
           </div>
           <div className="a-text">
                {element.text}
           </div>   

        </div>
        </div>
    
    })
  }

  const Question = function(){
    return  <div className="questionDiv" >
        {
            loading ?
            <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
            : <>
                        <div ref={testDivRef} className="question" >
            <div className="q" >
            <div className="q-img" >
                <img alt="question" src={question.qq.qurl} ></img>
            </div>
            <div  className="q-text" >
            <span><strong>{current} . </strong></span>
            <div style={{display: "inline-block",maxWidth:'96%'}} dangerouslySetInnerHTML={{__html: question.qq.q}} />
            </div>
            </div>
           
        </div>
        <div className="answer row" >
            <Option/>

        </div>
            </>
        }

    </div>
  }

  let handleReview = function(){
    let tempGrid = {
    }
    if(grid[current]){
        tempGrid[current] = {
            ...grid[current],
            isReviewd : grid[current].isReviewd ? false : true,
    
    
        }
        setGrid(prev => {
           return { 
            ...prev,
            ...tempGrid
           } 
        });
    }
    setCurrent( current < 25 ? current+1 : current);
  
    handleSave(true);
 
    

  }
  let handleBack = function(){
    
    setCurrent( current > 1 ? current+1 : current);

  }
  let handleNext = function(){
    let tempGrid = {}
    handleSave();
    setCurrent( current < 25 ? current+1 : current);
    if(grid[current+1]){
        tempGrid[current+1] = {
            ...grid[current+1],
            isOpened : true,
    
    
        }
        setGrid(prev => {
           return { 
            ...prev,
            ...tempGrid
           } 
        });
    }

  }

  let handleSave = (review) => {
    if(!answer || answer.length === 0){
        return;
    }
    let tempAnswer = {
    }
    tempAnswer[current] = answer
    console.log(tempAnswer)
    setAnswers(prev => {
       return {
            ...prev,
            ...tempAnswer
        }
    })
    if(grid[current]){
        let tempGrid= {}
        tempGrid[current] = {
            ...grid[current],
            answer : true,
            isReviewd : review
    
    
        }
        setGrid(prev => {
           return { 
            ...prev,
            ...tempGrid
           } 
        });
    }
    
   
  }

  let handleSubmit = async function(){
    if(!initialized ) return
    if(!attempt) return;
    setSubmitted(true)
    handleSave();
    setMainLoader(true);
    dispatch(submitQuiz({attempt_id : attempt,answers:answers ,time_left : seconds}))
    .unwrap()
    .then(res => {
        localStorage.setItem('score',JSON.stringify(res.data));
        setMainLoader(false)
        navigae('/result');
    })
    .catch(err =>{ 
        setMainLoader(false)
    })

  }
 
  let called = 0;
  let Timer =  function(){
  let [time,setTime] = useState(initialTime);

    return <div className="time-left w-40 text-center text-white px-2 py-2 bg-timer shadow-sm">
        <div className="text-center text-white " >Time Left</div>
        <span>{minutes}</span>:<span>{seconds}</span>

    </div>
  }

  const Buttons = function(){
   return <div className="row gapx-1 buttons" >

        {
            current < 25 ? 
            <div className="saveBut col-lg-3 col-md-3 col-sm-3  col-6" >
            <div class="bottom" >
            
                <button onClick={() =>handleNext()} className="text-white px-2 py-2 bg-main rounded-lg shadow-sm font-bold" >
                    Save & Next
                </button>
            </div>
            </div> : <></>
        }
        <div className="reviewBut col-lg-3 col-md-3 col-sm-3  col-6" >
            <div class="bottom" >
                <button onClick={handleReview} className=" text-white px-2 py-2 bg-review rounded-lg shadow-sm font-bold" >
                    Review Later
                </button>
            </div>
        
        </div>
        <div  className="backBut col-lg-3 col-md-3 col-sm-3 col-6" >
        <div class="bottom" >

            <button onClick={handleBack} className="text-white px-2 py-2 bg-back rounded-lg shadow-sm font-bold" >
                Back
            </button>
        </div>
        </div>

     
        <div className="submitBut col-lg-3 col-md-3 col-sm-3  col-6" >
        <div class="bottom" >
        
            <button  onClick={() => setIsOpen(true)}  className="text-white px-2 py-2 bg-submit rounded-lg shadow-sm font-bold" >
                Submit Quiz
            </button>
        </div>
        </div>

    </div>
  }

  

  return (
    
    <div id="quiz" className="quiz">
        <div style={{justifyContent: 'space-between'}} className="row" >
            <div className="quiz-logo" >
                <img alt="logo" src={logo} />
            </div>
            <Timer />
        </div>{

    mainLoader ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    :  <div>
        <div className="row" >
            <div className="col-lg-9 col-md-8 col-12" >
                <div className="row" >
                {
                    question ?  
                    <Question/> : 
                    <></>

                }
                </div>
               
            </div>
            <div style={{height:'min-content',}} className="col-lg-3 col-md-4 col-12" >
                <GridDiv />
            </div>

        </div>
        <div className="row" >
            <Buttons />
        </div>
    
       
        <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="instructions"
        className="instructions-div"
      >
          <h5>Submit Quiz</h5>
        <p>Do you want to Submit the quiz?</p>
        <div className="btnn" >
               <button  onClick={() => {handleSubmit();}} style={{display:'inline-block',marginRight:'10px'}} >Yes</button> 
               <button  onClick={() => setIsOpen(false)} style={{display:'inline-block',marginRight:'10px'}} >No</button> 

        </div>
      </Modal>
        </div>
        </div>
}
        
    </div>
   
  );


};

export default Quiz;
