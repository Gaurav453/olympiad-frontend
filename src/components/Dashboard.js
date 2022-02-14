import React , { useEffect,useState } from "react";
import {useSelector ,useDispatch } from 'react-redux';
import { Navigate,Link } from "react-router-dom";
import { getPreviousAttempts } from '../slices/quiz'
import LoginBar from './LoginBar'
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BounceLoader from "react-spinners/BounceLoader";
const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;

const Dashboard = () => {
  const navigate = useNavigate();
  let user = useSelector(state => state.auth);
  user = user?.user;
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    previousAttempts();

  },[])

  const [attempts,setAttempts] = useState([]);
  const [completed,setCompleted] = useState(false);
  const [language,setLangauge] = useState(false);
  let [loading , setLoading ] = useState(false);




  if(!user){
    return <Navigate to="/" />;

  }
  else if(!user.email)
    return <Navigate to="/profile" />;

 

  let previousAttempts = ()=>{
    
    dispatch(getPreviousAttempts({}))
    .unwrap()
    .then((res)=>{
      console.log(res);
      setAttempts(res.data.attempts);
      setCompleted(res.data.allCompleted)

    })
    .catch(() =>{

    })


  }
  let errorMessage = function(message){
    toast.error(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      theme: "dark",
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  }
  let instructions = function(e) {
    e.preventDefault();

    if(!completed){
      console.log("Please complete your previous attempt first");
      errorMessage("Please complete your previous attempt first");
      return;
    }
    if(!language){
      console.log("Please select a language first");
      errorMessage("Please select a language first");

      return;
      
    }
    startQuiz();
    openModal();

  }

  let startQuiz = function() {

    console.log('start quiz');
    localStorage.setItem('language',language);

  }

  let handleResult = (score) =>{
    localStorage.setItem('score', JSON.stringify(score));
    navigate("/result");

  }
  const Layout = function (){
  
    return    loading ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    : <div className="dashboard" >
      <div className="row">
        <div className="col">
          <LoginBar login={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
        </div>
        <div className="col-6">
          <div className="mx-auto">
            Welcome to Olympiad {user.first_name}
    
          </div>
        </div>
        <div className="col">
          <div className="shadow-lg p-4 rounded-lg drop-downs startQuiz" >
            <div className="text-center mb-2 font-extrabold" >
              <h5>Start Quiz</h5>
            </div>

            <div className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { language  ? language : "Select Language" }
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => setLangauge("ENGLISH")} className={language === "ENGLISH" ? 'dropdown-item active' : 'dropdown-item'}>English</button>
                <button onClick={() => setLangauge("HINDI")} className={language === "HINDI" ? 'dropdown-item active' : 'dropdown-item'}>Hindi</button>
                <button onClick={() => setLangauge("PUNJABI")} className={language === "PUNJABI" ? 'dropdown-item active' : 'dropdown-item'}>Punjabi</button>
              </div>
            </div>
            <button onClick={instructions} className="bg-main text-white px-2 py-1 rounded-lg mt-3 form-button" >Start Quiz</button>
          </div>
     
        <div className="shadow-lg p-4 rounded-lg  previousAttempts">
        <div className="text-center mb-2 font-extrabold" >
              <h5>Your Last Attempts are</h5>
            </div>
          {
            attempts.map((element,index) => {

              return <div key={index} className="attempt mb-2">
                <span className="mr-4 " >{index+1} .</span>
                {
                  element.isCompleted ? 
                  <div style={{ display : 'inline-block' }}>
                     <span>You scored  {element.score.percentage} %</span>
                     <button style={{leftMargin : 15 + 'px'}} onClick={() => handleResult(element.score)} className="bg-main text-white px-4 py-1 rounded-lg check-result" >Check Result</button>

                  </div>

                  : 
                  <div className="inline-block" >
                    <Link to="/quiz" onClick={startQuiz} className="bg-main text-white px-2 py-2 rounded-lg font-bold form-button">
                    Continue attempt 

                    </Link>
                  </div>
                }
              </div>
            })
          }
        </div>
        </div>
      </div>
    </div>
   
    
  
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding : "20px",
      borderRadius : "15px"
    },
  };

  let instruction = [ '1. This test is based on MCQ pattern',

  '2. There can be more than one correct option (even for a single fill in the blanks)',

  
  '3. Time duration : 15 minutes',
  
  '4. Questions : 25',
  
  '5. Marking Scheme : +4 for every right answer & -1 for every wrong answer',
  
   "6. Passing percentage : 40%",
  
    "7. After completion of test, you will be redirected to an additional bonus round - 'Spin the wheel' to improve your score",
    "8. There will be no negative marking for the Bonus round",
    "9.  Instant result and certificate after submission of test"]



  return (

    <div className="instructions">
      <Layout/>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="instructions"
        shouldCloseOnOverlayClick={false}
        className="instructions-div"
      >
        <h5>Instructions</h5>
        {
            instruction.map((element,index) =>{
                return <div key={index} >
                    <p>
                        {element}
                    </p>
                </div>
            })
        }
        <div class="btnn">
        <Link to="/quiz"  >Start</Link>

        </div>
      </Modal>
    </div>
   
  );


};

export default Dashboard;
