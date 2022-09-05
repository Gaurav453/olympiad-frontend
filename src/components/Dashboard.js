import React , { useEffect,useState } from "react";
import {useSelector ,useDispatch } from 'react-redux';
import { Navigate,Link } from "react-router-dom";
import { getPreviousAttempts ,performance } from '../slices/quiz'
import { userSchool,logout } from '../slices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp} from '@fortawesome/free-solid-svg-icons'
import  Footer from './footer'

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
const overrideSecond = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 15%;
  margin-bottom: 25%;

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
  let guest = localStorage.getItem('guest');
  if(guest == 'true'){
    dispatch(logout())
  }


  function closeModal() {
    setIsOpen(false);
  }



  const [attempts,setAttempts] = useState([]);
  const [completed,setCompleted] = useState(false);
  const [language,setLangauge] = useState(false);
  let [loading , setLoading ] = useState(false);
  let [secondLoader , setsecondLoader ] = useState(false);

  let [school , setSchool ] = useState(false);
  let [sort,setSort] = useState(-2)
  let [myperformance , setPerformance ] = useState({
    "city" : -1,
    "state" : -1,
    "total" : -1,
    "school" : -1,
  });







  let handleSort = (v) => {

    setSort(v);
    previousAttempts(v);
  }

 let getPerformance = ()=>{
    
    dispatch(performance({}))
    .unwrap()
    .then((res)=>{
     // console.log(res);
      let temp = res.data;
      setPerformance(pre => {
        return {...pre,
        ...temp
      }

      })
      // console.log("value " ,temp);
      // console.log(performance)

    })
    .catch(() =>{

    })


  }
  let previousAttempts = (v) => {
    // console.log(sort);
    dispatch(getPreviousAttempts({sort:v || sort}))
    .unwrap()
    .then((res)=>{
      console.log(res);
      setAttempts(res.data.attempts);
      setCompleted(res.data.allCompleted);
      setLoading(false);


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

  let getuserSchool = function(){
    dispatch(userSchool({}))
    .unwrap()
    .then((res) => {
      if(res.data?.name){
        setSchool(res.data?.name)
      }
      
    })
  }

  let startQuiz = function() {

    console.log('start quiz');
    localStorage.setItem('language',language);

  }

  let continueQuiz = function() {

    console.log('start quiz');
    localStorage.setItem('language',language);
    navigate('/quiz')

  }

  let handleResult = (score,certificate_sno) =>{
    localStorage.setItem('score', JSON.stringify(score));

    navigate("/result",{state : score});

  }
  const Layout = function (){
  
    return    loading ?
    <BounceLoader color="#f0962e" loading={true} css={overrideSecond} size={100} />
    : <div className="dashboard" >
      <div className="row">
        <div className="col">
          <LoginBar isHome={"false"} />
        </div>
      </div>
      <div className="row top">
        <div className="col-12">
          <h4>Welcome {user.first_name}</h4>
        </div>
        <div className="col-12">
        <div className=" drop-downs startQuiz" >
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

                {/* <button onClick={() => setLangauge("PUNJABI")} className={language === "PUNJABI" ? 'dropdown-item active' : 'dropdown-item'}>Punjabi</button> */}
              </div>
            </div>
            <button onClick={instructions} className="bg-main text-white px-2 py-1 rounded-lg mt-3 form-button" >Start Quiz</button>
          </div>
        </div>
      </div>
      <div className="row second">
        <div className="col-12 col-md-8">
          <div>

          <div className="table">
          <h5>Previous Attempts</h5>
          {
            secondLoader ?
            <BounceLoader color="#f0962e" loading={true} css={overrideSecond} size={100} />

            :     <table >
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th style={{cursor:'pointer'}} onClick={() => sort === 2 ? handleSort(-2) : handleSort(2) } scope="col">Score
                {
                  sort === -2 ? <FontAwesomeIcon icon={faAngleUp}/> : sort === 2 ? <FontAwesomeIcon icon={faAngleDown}/>  : <></>
                }
                
                
                </th>
                <th scope="col">Result</th>
                <th scope="col">Language</th>
                <th style={{cursor:'pointer'}}  onClick={() => sort === 1 ? handleSort(-1) : handleSort(1) }scope="col">Attempt Date
                {
                  sort === -1 ? <FontAwesomeIcon icon={faAngleUp}/> : sort === 1 ? <FontAwesomeIcon icon={faAngleDown}/>  : <></>
                }
                
                
                </th>
              </tr>
            </thead>
            <tbody>
            {
              attempts.map((element,index) => {
  
                return    <tr key={index}  >
                <th scope="row">{index+1}</th>
                <td> {element.isCompleted ?  element.score +  "%" :  'N/A'} </td>
                <td>      
                     { element.isCompleted ?            <button style={{leftMargin : 15 + 'px'}} onClick={() => handleResult(element)} className="bg-main text-white px-4 py-1 rounded-lg check-result" >Check Result</button>
               :  <button style={{leftMargin : 15 + 'px'}} onClick={() => continueQuiz()} className="bg-main text-white px-4 py-1 rounded-lg check-result" >Continue Attempt</button>
                      }
                
                </td>
                <td>{element.language}</td>
                <td>{element.created_at}</td>
              </tr>
                
  
              })
            }
           
      
            </tbody>
          </table>
          }

     
          </div>
          </div>
         
    
        
        </div>
        <div className="col-12 col-md-4">
          {
            myperformance.state !== -1 ||  myperformance.city !== -1 || myperformance.total !== -1 || (myperformance.school !== -1 && school) ?
            <div className="performance">
            <h5>Your Performance</h5>

              {
                myperformance.city !== -1 ?
                <li>You are in top {myperformance.city}% in your city</li>  : <></>
              }
              {
                myperformance.state !== -1 ?
                <li>You are in top {myperformance.state}% in your state</li>  : <></>
              }
              {
                myperformance.total !== -1 ?
                <li>You are in top {myperformance.total}% Overall</li>  : <></>
              }
              {
                myperformance.school !== -1 && school ?
                <li>You are in top {myperformance.school}% in your school</li>  : <></>
              }

            </div>
            :<></>

          }
    
       
     
          </div>
      </div>
    </div>
   
    
  
  }


  useEffect(() => {
    setLoading(true)
    getuserSchool();
    previousAttempts();
    getPerformance();

  },[])

  if(!user){
    return <Navigate to="/" />;

  }
  else if(!user.id)
    return <Navigate to="/profile" />;
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

  let englishInstruction = [ '1. This test is based on MCQ pattern',

  '2. There can be more than one correct option (even for a single fill in the blanks)',

  
  '3. Time duration : 15 minutes',
  
  '4. Questions : 25',
  
  '5. Marking Scheme: ',

  'Q. No. 1-10: +3 for every right answer',
  'Q. No. 11-20: +4 for every right answer',
  'Q. No. 21-25: +6 for every right answer',
  
   "6. Passing percentage : 40%",
  
    "7. For every wrong answer 1/4th marks will be deducted",
    "8. Partial marking will be given for each correct option marked",
    "9. Instant result and certificate after submission of test"]
  
    let hindiInstuction = ["1. यह परीक्षा बाहुल्य चयन प्रश्नों (MCQ's) पर आधारित है।",
    `2.  दिए गए विकल्पों में से एक से अधिक विकल्प भी सही हो सकते हैं। ( यहाँ तक कि रिक्त स्थान की एकाकी  पूर्ति के लिए भी)`,
    '3. समय सीमा - 15 मिनट है।',
    '4. कुल प्रश्न - 25 हैं।',
    `5. अंक आबंटन प्रक्रिया:- 
  प्रश्न  1 - 10 : +3 अंक प्रत्येक सही उत्तर के लिये
  प्रश्न  11 - 20 : +4 अंक प्रत्येक सही उत्तर के लिये
  प्रश्न  21 - 25 : +6 अंक प्रत्येक सही उत्तर के लिये`,
    `6. पासिंग प्रतिशत - 40% है।`,
  `7. प्रत्येक गलत उत्तर के लिये 1/4th  अंक काटा जाएगा।`,
  `8. हर सही उत्तर के लिए Partial अंक भी दिए जायेंगे`,
  `9. इस परीक्षा को सबमिट करते ही, आपको तत्काल अपना परीक्षा परिणाम और प्रमाण पत्र प्राप्त हो जाएगा ।` ]
  
  let punjabiInstruction = [

    "1. ਇਹ ਟੈਸਟ ਬਹੁ-ਚੋਣ ਪ੍ਰਸ਼ਨ ਪੈਟਰਨ ਤੇ ਅਧਾਰਿਤ ਹੈ",
    "2. ਇਕ ਤੋਂ ਵੱਧ ਸਹੀ ਉੱਤਰ ਹੋ ਸਕਦੇ ਹਨ I",
    "3. ਸਮਾਂ ਮਿਆਦ: 15 ਮਿੰਟ",
    "4. ਪ੍ਰਸ਼ਨ: 25",
    "5. ਮਾਰਕਿੰਗ ਸਕੀਮ:",
    "ਪ੍ਰਸ਼ਨ 1-10 : +3 ਹਰ ਇਕ ਸਹੀ ਉਤਰ ਲਈ",
    "ਪ੍ਰਸ਼ਨ 11-20 : +4 ਹਰ ਇਕ ਸਹੀ ਉਤਰ ਲਈ",
    "ਪ੍ਰਸ਼ਨ 21-25 : +6 ਹਰ ਇਕ ਸਹੀ ਉਤਰ ਲਈ",
    "6. ਪਾਸਿੰਗ ਪ੍ਰਤੀਸ਼ਤ - 40% ਹੈ I",
    "7. ਹਰ ਇਕ ਗਲਤ ਉਤਰ ਲਈ 1/4th ਅੰਕ ਕਟਿਆ ਜਾਏਗਾ I",
    "8. ਹਰ ਇਕ ਸਹੀ ਉਤਰ ਲਈ partial ਅੰਕ ਵੀ ਦਿੱਤੇ ਜਾਣਗੇ I",
    "9. ਇਸ ਪ੍ਰੀਖਿਆ ਨੂੰ ਸੁਬਮਿਟ ਕਰਦੇ ਹੀ ਤੁਹਾਨੂੰ ਉਸੀ ਸਮੇਂ ਪ੍ਰੀਖਿਆ ਦਾ ਨਤੀਜਾ ਅਤੇ ਪ੍ਰਮਾਣ ਪੱਤਰ ਮਿਲ ਜਾਏਗਾ I",
  ]


  return (

    <div className="instructions">
      <Layout/>
      <Footer />

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
            language === 'ENGLISH' ?  englishInstruction.map((element,index) =>{
              return <div key={index} >
                  <p>
                      {element}
                  </p>
              </div>
          }) : language === 'PUNJABI' ? punjabiInstruction.map((element,index) =>{
            return <div key={index} >
                <p>
                    {element}
                </p>
            </div>
        }) :   hindiInstuction.map((element,index) =>{
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
