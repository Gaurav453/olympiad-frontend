import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { genrateOtp , verifyOtp ,register , loginGuest as lg} from "../slices/auth";
import { Navigate,Link ,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit ,faEye } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { Country, State, City }  from 'country-state-city';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ClientCaptcha from "react-client-captcha";
import {saveProfile ,school } from '../slices/auth'









import useMergedState from '../hooks/MergeState';

import BounceLoader from "react-spinners/BounceLoader";
const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;

const SignupDesktop = () => {

  const navigate = useNavigate();

  let loginGuestObj = {
    "firstName": "",
    "lastName" : "",
    "phone" : "",
    "whats_no":"",
    "email" : "",
    "state" : "",
    "city" : "",
    "country" : "",
    "userip": "",
    "language" : "",
    "isSchool" : false,
    "class" : "",
    "school" : "",
    "father" : ""
  

  }
  let loginGuestErrObj = {
    "firstName": false,
    "lastName" : false,
    "phone" : false,
    "whats_no":false,
    "email" : false,

  }

  const [ firstName , setfirstName ] = useMergedState("");
  const [ lastName , setlastName ] = useMergedState("");
  const [ phone , setphone ] = useMergedState("");
  const [ password , setpassword ] = useMergedState("");
  const [ otp , setOtp ] = useMergedState("");
  const [ isSame , setisSame ] = useState(false);
  const [captcha,setCaptcha] = useState("");
  const [captchaValue,setCaptchaValue] = useState("");
  const [canRegister,setCanRegister] = useState(1);
  let [schoolName , setSchoolName] = useState("");
  let [schoolCode , setSchoolCode] = useState("");


  const [validateCaptchaValue, setValidateCaptcha] = useState(false);



  let [loading , setLoading ] = useMergedState(false);
  const [isOtpGenrated , setIsOtpGenrated ] = useMergedState(false);
  const [isOtpVerified , setIsOtpVerified ] = useMergedState(true);
  const [shouldGenrateOtp , setshouldGenrateOtp ] = useMergedState(false);


  const [firstNameError , serFirstNameError ] = useMergedState("");
  const [lastNameError , serLastNameError ] = useMergedState("");
  const [phoneError , serPhoneError ] = useMergedState("");
  const [passwordError , setpasswordError ] = useMergedState("");

  const [verifyOtpToken , setverifyOtpToken ] = useMergedState("");
  const [userName , setuserName ] = useMergedState("");

  const [modalIsOpen, setIsOpen] = useState(false);

  const [modalIsOpenIns, setModalIsOpenIns] = useState(false);

  const [loginGuest,setLoginGuest] = useState(loginGuestObj);
  const [loginGuestErr,setLoginGuestErr] = useState(loginGuestErrObj);

  
  const [isLoginGuest,setIsLoginGuest] = useState(false);


  const [country,setCountry] = useState();
  const [state,setState] = useState('');
  const [city,setCity] = useState('');

  const [countryList,setCountryList] = useState(Country.getAllCountries());
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);

  const [stateInput , setStateInput] =  useState("");
  const [cityInput , setCityInput] =  useState("");
  const [countryInput , setCountryInput] =  useState("");


  const [searchedStateList , setSearchedStateList]= useState(State.getStatesOfCountry(country));
  const [searchedCityList , setSearchedCityList]= useState([]);
  const [searchedCountryList , setSearchedCountryList]= useState([]);
  const [showPassword , setShowPassword ] = useState(false);


  // useEffect( () =>{
  //   const start = 2 * 60  // minutes
  //   const end = 5 * 60 // minutes
  //   var now = new Date();
  //   var currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since Midnight
    
  //   if(currentTime < start || currentTime > end){
  //     setCanRegister(1);
  //    }
  //    else{
  //     setCanRegister(0);
  //    }
     
  // },[])

  useEffect(() => {
    if(!schoolCode) return;
    dispatch(school({
      code : schoolCode
    }))
    .unwrap()
    .then(res => {
      if(res.data?.name){
        setSchoolName(res.data?.name)
      }
      else{
        setSchoolName("")
      }
    })
  },[schoolCode])
  useEffect(() => {
    if(loginGuest.email){
      setLoginGuestErr(pre => {
        return {
          ...pre ,
          email : pre.email.trim(),
  
        }
      })
    }
   
    let emailRegex = /\S+@\S+\.\S+/;
    let nameRegex = /^[a-z ,.'-]+$/i;

    if(loginGuest.firstName && !nameRegex.test(loginGuest.firstName)){

      setLoginGuestErr(pre => {
        return {
          ...pre,
          firstName : "Please Enter a valid first Name"
        }
      })
      
    }
    else{
      setLoginGuestErr(pre => {
        return {
          ...pre,
          firstName : false
        }
      })
    }

    if(loginGuest.lastName && !nameRegex.test(loginGuest.lastName)){

      setLoginGuestErr(pre => {
        return {
          ...pre,
          lastName : "Please Enter a valid last Name"
        }
      })
      
    }
    else{
      setLoginGuestErr(pre => {
        return {
          ...pre,
          lastName : false
        }
      })
    }
    if(loginGuest.email && !emailRegex.test(loginGuest.email)){

      setLoginGuestErr(pre => {
        return {
          ...pre,
          email : "Please Enter a valid email"
        }
      })
      
    }
    else{
      setLoginGuestErr(pre => {
        return {
          ...pre,
          email : false
        }
      })
    }

    if(loginGuest.phone &&loginGuest.phone.length !== 10){
      setLoginGuestErr(pre => {
        return {
          ...pre,
          phone : "Please Enter a valid phone"
        }
      })

    }
    else{
      setLoginGuestErr(pre => {
        return {
          ...pre,
          phone : false
        }
      })
    }

    if(loginGuest.whats_no && loginGuest.whats_no.length !== 10){
      setLoginGuestErr(pre => {
        return {
          ...pre,
          whats_no : "Please Enter a valid whats phone"
        }
      })

    }
    else{
      setLoginGuestErr(pre => {
        return {
          ...pre,
          whats_no : false
        }
      })
    }
    console.log(loginGuestErr)




  },[loginGuest])

  useEffect(() => {
    setSearchedStateList(stateList)

  },[stateList])

  useEffect(() => {
    setSearchedCityList(cityList)

  },[cityList])
  useEffect(() => {
    setSearchedCountryList(countryList)

  },[countryList]);

  useEffect(() => {
    if(stateInput.length > 0){
      let temp = stateList.filter(a => {
        return a.name.substring(0,stateInput.length).toLowerCase() === stateInput.toLowerCase();
  
      })
      console.log(temp)
      setSearchedStateList(temp);
    }
    else{
      setSearchedStateList(stateList)
    }
   
    
  },[stateInput,stateList])

  useEffect(() => {
    if(cityInput.length  > 0 ){
      let temp = cityList.filter(a => {
        return a.name.substring(0,cityInput.length).toLowerCase() === cityInput.toLowerCase();
  
      })
      setSearchedCityList(temp);
    }
    else{
      setSearchedCityList(cityList);

    }

    
  },[cityInput,cityList])

  useEffect(() => {
    if(countryInput.length  > 0 ){
      let temp = countryList.filter(a => {
        return a.name.substring(0,countryInput.length).toLowerCase() === countryInput.toLowerCase();
  
      })
      setSearchedCountryList(temp);
    }
    else{
      setSearchedCountryList(countryList);

    }
  },[countryInput,countryList])

///State.getStatesOfCountry(country)

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

  let hindiInstuction = [
    
    "1. यह परीक्षा बाहुल्य चयन प्रश्नों (MCQ's) पर आधारित है।",
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

let instruction = []

  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
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


  const dispatch = useDispatch();

  let emailRegex = /\S+@\S+\.\S+/;

  useEffect(() => {
    if(captcha.length > 0)
      {
        if(captcha === captchaValue){
          setValidateCaptcha(true);
          console.log('matched');
        }
      }
  },[captcha,captchaValue])

  useEffect(() => {
    let nameRegex = /^[a-z ,.'-]+$/i;
    if(firstName && !nameRegex.test(firstName)){
      serFirstNameError("Please enter a valid Name")
    }
    else{
      serFirstNameError("")
    }
    if(lastName && !nameRegex.test(lastName)){
      serLastNameError("Please enter a valid last Name")
    }
    else{
      serLastNameError("")
    }

    if(phone && phone.length !== 10){
      serPhoneError("Please enter a valid phone number")
    }
    else{
      serPhoneError("")
    }

    if(password && password.length < 6){
      setpasswordError("Please enter a valid password")
    }
    else{
      setpasswordError("")
    }


  },[firstName,lastName,phone,password])

  // useEffect(() => {
  //   if(phone.length === 10) {
  //     setshouldGenrateOtp(true)
  //   }
  //   else{
  //     setshouldGenrateOtp(false)

  //   }
  //   setIsOtpGenrated(false);
  //   setIsOtpVerified(false);



  // },[phone,firstName,lastName])

 
  let handleGenrateOtp = function(){
    setLoading(true);
    dispatch(genrateOtp({phone}))
    .unwrap()
    .then(() =>{
      console.log('otp sent successfully')
      setLoading(false);
      setIsOtpGenrated(true);
    })
    .catch(() =>{
      setLoading(false);

    })
  }

  let isDetailsFilled = function(){
    if(!validateCaptchaValue) {
      if(captcha === ""){
        errorMessage("Please fill captcha first")
        return;
      }
      else{
        errorMessage("Wrong Captcha Entered!")
        return;
      }
     
    }
    if(!firstName || !lastName || !phone || firstNameError || lastNameError || phoneError){  
      errorMessage("Please Fill all correct details")
      return;

    }

    if(!isOtpGenrated && !isOtpVerified){
      errorMessage("Please Generate OTP first")
      return;

    }
    else if (isOtpGenrated && !isOtpVerified){
      errorMessage("Please Verify otp")
      console.log('Please verify otp')
      return;

    }
    else if(isOtpVerified && (!password || passwordError)){
      errorMessage("Please Enter Password")
      return;
    }
    else if(isOtpVerified){
      return true;
    }

    return false;
    

  }
  let openLoginGuest = () => {
    setCaptcha(""); 
    setValidateCaptcha(false);
    setIsLoginGuest(true);
  }
  let handleLoginGuest = function(){
    if(!validateCaptchaValue) {
      if(captcha === ""){
        errorMessage("Please fill captcha first")
        return;
      }
      else{
        errorMessage("Wrong Captcha Entered!")
        return;
      }
     
    }
    let {firstName, lastName,phone,email,whats_no,state,city,country,isSchool ,language ,father} = loginGuest;
    console.log(isSame);
    if(!state || !city || !country || (isSchool && (!loginGuest.class  || !father )) || !language ){  
      errorMessage("Please Fill all  details")
      return;

    }

    if(isSame) {
      handleGuestLoginChange('whats_no',phone)
    }
    setIsLoginGuest(false);
    setModalIsOpenIns(true)




  }

  let handleSubmit  = function(){


      setLoading(true);

      let dataObj = {
        phone,
        password,
        first_name : firstName,
        last_name : lastName,
      }
      dispatch(register({dataObj}))
      .unwrap()
      .then((res) =>{
        setuserName(res.data.username)
        setLoading(false);
        setIsOpen(true);
          console.log('success')
      })
      .catch(() =>{
        setLoading(false);
  
      })

  }
  let handleOtpSubmit  = function(){

    if(!phone){
      return;
    }
    if(otp.length !== 6) {
      errorMessage("Please enter a valid otp")
    }
    else{
      setLoading(true);

      let dataObj = {
        phone,
        otp,
        first_name : firstName,
        last_name : lastName,
      }
      dispatch(verifyOtp(dataObj))
      .unwrap()
      .then((res) =>{

        console.log('otp  verified',res);
        let {data} = res;
        setIsOtpGenrated(false);
        setverifyOtpToken(data.token);
        setuserName(data.username);
        setIsOtpVerified(true)
        setLoading(false);



      })
      .catch(() =>{
        setLoading(false);
  
      })
    }
    

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

  let handleGuestLoginChange = (key,value) =>{
    let  obj = {};
    obj[key] = value
    setLoginGuest(pre => {
    return {
        ...pre,
        ...obj
      }
    })
    // console.log(loginGuest);
  }


  let navigateQuiz = () =>{
    let data = loginGuest;
    if(!data.isSchool) {
      data.category = "Individual"
    }
    else{
      data.category = "School"
      data.school_code = schoolCode;

    }
    dispatch(lg(data))
    .unwrap()
    .then((res => {
      localStorage.setItem('language',loginGuest.language);
      setModalIsOpenIns(false);
      navigate('/quiz',{ replace: true })
     


    }))
    .catch(err =>{ 
      console.log(err);
    })
   
  }
  console.log(canRegister)
  return ( 
    loading ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    :
    <div style={{height: '100%'}} className="signup-desktop">
    { 
      canRegister ?  <div className="box">
      <div className="main-heading">
        <h1>Sign Up</h1>
        <h3>for a better tommorow</h3>
      </div>
      <div className="form" >
        <div>
           <p>First Name</p> 
           <input value={firstName} disabled={isOtpGenrated ? "disabled" : ""} onChange={(e) => setfirstName(e.target.value)} placeholder="Please enter your First Name"className="form-input" ></input>
             <p className="error-message"  >{firstNameError}</p> 

        </div>
        <div>
           <p>Last Name</p>
           <input  value={lastName} disabled={isOtpGenrated ? "disabled" : ""}  onChange={(e) => setlastName(e.target.value)}  placeholder="Please enter your Last Name"className="form-input" ></input>
           <p className="error-message"  >{lastNameError}</p> 
        </div>
        <div className="row" >
          <div  className="col" >
            <p>Phone Number</p>
            <input  value={phone} disabled={isOtpGenrated ? "disabled" : ""}  onChange={(e) => setphone(e.target.value)}  placeholder="Please enter your Phone Number"className="form-input" >


            </input>{
                  isOtpGenrated ? 
                  <FontAwesomeIcon onClick={() =>  setIsOtpGenrated(false)} className="edit"  icon={faEdit} /> : <></>
            }
          

            <p className="error-message"  >{phoneError}</p> 

          </div>
          {
            isOtpGenrated  ? 
            <div className="col-12 otpDiv">
              <input value={otp} onChange={(e) => setOtp(e.target.value)}  placeholder="Enter Otp"className="form-input" ></input> 
              <button onClick={handleOtpSubmit} className="form-button" >Verify OTP </button>

            </div>
             : shouldGenrateOtp && !isOtpVerified ? 
             
            <div className="col-12 otpDiv">
             <button onClick={ handleGenrateOtp} className="form-button" > Generate OTP</button>
           </div>
             : <></>
          }
         
         
        </div>
        <div>
          {
           isOtpVerified ?  
           <div className = "password-input">
            <p>Password</p>
            <input value={password} type={showPassword ? 'text' : 'password' } onChange={(e) => setpassword(e.target.value)} placeholder=" Enter Password"className="form-input" ></input>
            <FontAwesomeIcon  onClick={() => setShowPassword(!showPassword)} className = "eye" icon={faEye} />
            
            <p className="error-message"  >{passwordError}</p> 

           </div>

          : <></>

          }
          

        </div>
        <div className="captcha">
            <ClientCaptcha captchaCode={code => setCaptchaValue(code)} />
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Captcha"className="form-input" ></input>
       </div>
        <div  >
                <button  onClick={() => { 
                  isDetailsFilled() ? handleSubmit() : console.log("Er") }} className="form-button"  >Register</button>
                  <div style={{display : 'none',marginLeft : '10px'}} className="forgot">
              <span onClick={openLoginGuest} >Login as guest</span>

            </div>
            
      </div>
    
          

      </div>

    </div> : <div className="endTime">
                You can Only Register between 11 AM and 5 Pm
    </div>
    }
     
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="instructions"
            shouldCloseOnOverlayClick={false}
            className="instructions-div"
          >
            
            <h5>Note</h5>
              <p class="note" > Your user name is <span style={{fontWeight:"bold"}} >{userName || "etxt"}</span></p>
              <p class="note" > Please note it down. You have to login with this username later.</p>

            <div  class="btnn">
              <button onClick={closeModal} > Okay!</button>
            </div>
          </Modal>

          <Modal
          isOpen={isLoginGuest}
          onRequestClose={() => setIsLoginGuest(false)}
          style={customStyles}
          contentLabel="instructions"
          shouldCloseOnOverlayClick={false}
          className="instructions-div"
          >
                       <div onClick={() => setIsLoginGuest(false)}  className="close-modal" >

<FontAwesomeIcon icon={faTimes} />
</div>
          <h5>Login As Guest</h5>
          <div className="box">
        <div className="form" >
          <div>
             <p>First Name</p> 
             <input value={loginGuest.firstName} onChange={(e) => handleGuestLoginChange("firstName",e.target.value)} placeholder="Please enter your First Name"className="form-input" ></input>
             <p className="error-message"  >{loginGuestErr.firstName}</p> 

          </div>
          <div>
             <p>Last Name</p>
             <input  value={loginGuest.lastName}  onChange={(e) => handleGuestLoginChange("lastName",e.target.value)}  placeholder="Please enter your Last Name"className="form-input" ></input>
             <p className="error-message"  >{loginGuestErr.lastName}</p> 

          </div>
          <div>
              <p>Phone Number</p>
             <input  value={loginGuest.phone}  onChange={(e) => handleGuestLoginChange("phone",e.target.value)}  placeholder="Please enter your Phone Number"className="form-input" ></input>
             <p className="error-message"  >{loginGuestErr.phone}</p> 

          </div>
          <div  style={{display:'flex',margin:"10px 0"}} >
            <div>
              <input onClick={() => setisSame(!isSame)} type="checkbox" />
            </div>
            <div style={{marginLeft:20}}  >
              <span  >Check if WhatsApp  number is same as above</span>
            </div>
          </div>
          {
            !isSame ? 
            <div>
            <p>WhatsApp Number</p>
            <input value={loginGuest.whats_no}   onChange={(e) => handleGuestLoginChange("whats_no",e.target.value)}  placeholder="Please enter your WhatsApp Phone Number"className="form-input" ></input>
            <p className="error-message"  >{loginGuestErr.whats_no}</p> 

          </div> : <></>
          }
          <div>
             <p>Email</p> 
             <input  value={loginGuest.email}  onChange={(e) => handleGuestLoginChange("email",e.target.value)} placeholder="Please enter your Email"className="form-input" ></input>
            <p className="error-message"  >{loginGuestErr.email}</p> 

          </div>
         
          
          <div style={{margin:"20px 0"}} className="drop-downs">
          <div  style={{display:'flex',margin:"20px 0"}} >
            <div>
              <input onClick={() => handleGuestLoginChange("isSchool",!loginGuest.isSchool)} type="checkbox" />
            </div>
            <div style={{marginLeft:20}}  >
              <span  >Check if You are a school Student</span>
            </div>
          </div>
            {
              loginGuest.isSchool ? 
                <div>
                <div>
                 <p>Father's  Name</p> 
                 <input  value={loginGuest.father} onChange={(e) => handleGuestLoginChange("father",e.target.value)} placeholder="Please enter your Father's Name"className="form-input" ></input>
    
              </div>
    
              <div className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { loginGuest.class ? loginGuest.class  :  "Enter Class"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => handleGuestLoginChange("class","6th")} className={loginGuest.class === "6th" ? 'dropdown-item active' : 'dropdown-item'}>6th</button>
                <button onClick={() => handleGuestLoginChange("class","7th")} className={loginGuest.class === "7th" ? 'dropdown-item active' : 'dropdown-item'}>7th</button>
                <button onClick={() => handleGuestLoginChange("class","8th")} className={loginGuest.class === "8th" ? 'dropdown-item active' : 'dropdown-item'}>8th</button>
                <button onClick={() => handleGuestLoginChange("class","9th")} className={loginGuest.class === "9th" ? 'dropdown-item active' : 'dropdown-item'}>9th</button>
                <button onClick={() => handleGuestLoginChange("class","10th")} className={loginGuest.class === "10th" ? 'dropdown-item active' : 'dropdown-item'}>10th</button>
                <button onClick={() => handleGuestLoginChange("class","11th")} className={loginGuest.class === "11th" ? 'dropdown-item active' : 'dropdown-item'}>11th</button>
                <button onClick={() => handleGuestLoginChange("class","12th")} className={loginGuest.class === "12th" ? 'dropdown-item active' : 'dropdown-item'}>12th</button>
              </div>
            </div>
            </div> : <></>
            }
       
          </div>
          {
            loginGuest.isSchool ? 
            <div class="school_code" >
            <p>School Code</p>
            <input placeholder="Enter Your School Code"  onChange={(e) => setSchoolCode(e.target.value)} className="form-input" ></input>
            <span>{schoolName}</span>
          </div> : <></>
          }

 <div style={{margin:"20px 0"}} className="userLocation">
          <p style={{marginTop: '10px',fontWeight: 'bold'}}>Select Your Country state and city</p>
          <div className="drop-downs">
          <div style={{marginRight : "10px"}} className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {loginGuest.country ? loginGuest.country :"Select Country"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div class="dropdown-item" >
                <input placeholder="Search your Country" onChange={(e) => setCountryInput(e.target.value)}  value={countryInput} class="form-input" ></input>

              </div>
               {
                 searchedCountryList.map(entry => {
                   return <button onClick={() => { handleGuestLoginChange('country',entry.name);setStateList(State.getStatesOfCountry(entry.isoCode))}} key={entry.isoCode} className={country === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name}

                     </button>

                 })
               }
              </div>
            </div>
            {
              loginGuest.country ? 
              <div style={{marginRight : "10px"}}   className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {loginGuest.state ? loginGuest.state :"Select State"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div class="dropdown-item" >
                  <input placeholder="Search your state" onChange={(e) => setStateInput(e.target.value)}  value={stateInput} class="form-input" ></input>

                </div>
               {
                 searchedStateList.map(entry => {
                   return <button onClick={() => { handleGuestLoginChange('state',entry.name);setCityList(City.getCitiesOfState(entry.countryCode,entry.isoCode)) }} key={entry.isoCode} className={state === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name}

                     </button>

                 })
               }
              </div>
            </div> : <></>

            }
     
            {
              loginGuest.state ? 
              <div className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {loginGuest.city ? loginGuest.city :"Select City"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <div class="dropdown-item" >
                <input placeholder="Search your city" onChange={(e) => setCityInput(e.target.value)}  value={cityInput} class="form-input" ></input>

              </div>
               {
                 searchedCityList.map(entry => {
                   return <button onClick={() => handleGuestLoginChange('city',entry.name)} key={entry.name} className={city === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name}

                     </button>

                 })
               }
              </div>
               
            </div>  : <></>
            }
     
       
          </div>

          </div> 
          <p style={{marginTop: '10px',fontWeight: 'bold'}}>Select Your Language</p>
          <div  className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { loginGuest.language  ? loginGuest.language : "Select Language" }
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => handleGuestLoginChange("language","ENGLISH")} className={loginGuest.language === "ENGLISH" ? 'dropdown-item active' : 'dropdown-item'}>English</button>
                <button onClick={() =>  handleGuestLoginChange("language","HINDI")} className={loginGuest.language === "HINDI" ? 'dropdown-item active' : 'dropdown-item'}>Hindi</button>
                {/* <button onClick={() =>  handleGuestLoginChange("language","PUNJABI")} className={loginGuest.language === "PUNJABI" ? 'dropdown-item active' : 'dropdown-item'}>Punjabi</button> */}
              </div>
            </div>
        </div>

      </div>
        <div className="captcha">
            <ClientCaptcha captchaCode={code => setCaptchaValue(code)} />
            <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Captcha"className="form-input" ></input>
        </div>
          <div  class="btnn">
            <button onClick={handleLoginGuest} > Register</button>
          </div>
          </Modal>

        <Modal
        isOpen={modalIsOpenIns}
        onRequestClose={() => setModalIsOpenIns(false)}
        style={customStyles}
        contentLabel="instructions"
        shouldCloseOnOverlayClick={false}
        className="instructions-div"
        >
        <h5>Instructions</h5>
        { 
       
           loginGuest.language === 'ENGLISH' ?  englishInstruction.map((element,index) =>{
                return <div key={index} >
                    <p>
                        {element}
                    </p>
                </div>
            }) :  hindiInstuction.map((element,index) =>{
              return <div key={index} >
                  <p>
                      {element}
                  </p>
              </div>
            })
        }
        <div class="btnn">
        <button onClick={() => navigateQuiz()} >Start</button>

        </div>
        </Modal>

    </div>
  );
};

export default SignupDesktop;

// <div style={{display : 'none',marginLeft : '10px'}} className="forgot">
//               <span onClick={openLoginGuest} >Login as guest</span>

//             </div>