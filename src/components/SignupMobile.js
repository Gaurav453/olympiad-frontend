import { useEffect ,useState} from 'react';
import {  useDispatch } from 'react-redux';
import { genrateOtp , verifyOtp ,register, login ,  loginGuest as lg} from "../slices/auth";
import {  forgetUserName, forgetPassword as forgetP, getUserName, resetPassword } from "../slices/auth";
import { Country, State, City }  from 'country-state-city';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Navigate  ,useNavigate} from "react-router-dom";
import logo from '../assets/images/Logo009_min2.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import ClientCaptcha from "react-client-captcha";
import {saveProfile ,school } from '../slices/auth'



const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;


const SignupMobile = () => {
  let navigate = useNavigate();


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
  

  }
  let loginGuestErrObj = {
    "firstName": false,
    "lastName" : false,
    "phone" : false,
    "whats_no":false,
    "email" : false,

  }
  const [ firstName , setfirstName ] = useState("");
  const [ lastName , setlastName ] = useState("");
  const [ phone , setphone ] = useState("");
  const [ password , setpassword ] = useState("");
  const [otpSent , setOtpSent] = useState(false);
  const [otpVerified , setOtpVerified] = useState(false);
  const [otp , setOtp] = useState("");
  const [usernames , setUsernames] = useState([]);
  const [forgetUsername,setFotgetUsername] = useState(false);;
  const [forgetPassword,setFotgetPassword] = useState(false);;
  const [modalIsOpenIns, setModalIsOpenIns] = useState(false);

  const [loginGuest,setLoginGuest] = useState(loginGuestObj);
  const [isLoginGuest,setIsLoginGuest] = useState(false);
  const [ isSame , setisSame ] = useState(false);
  const [captcha,setCaptcha] = useState("");
  const [validateCaptchaValue, setValidateCaptcha] = useState(false);




  const [country,setCountry] = useState();
  const [state,setState] = useState('');
  const [city,setCity] = useState('');

  const [countryList,setCountryList] = useState(Country.getAllCountries());
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);

  const [loading , setLoading ] = useState(false);
  const [isOtpGenrated , setIsOtpGenrated ] = useState(false);
  const [isOtpVerified , setIsOtpVerified ] = useState(true);
  const [shouldGenrateOtp , setshouldGenrateOtp ] = useState(false);


  const [firstNameError , serFirstNameError ] = useState("");
  const [lastNameError , serLastNameError ] = useState("");
  const [phoneError , serPhoneError ] = useState("");
  const [passwordError , setpasswordError ] = useState("");

  const [verifyOtpToken , setverifyOtpToken ] = useState("");
  const [userName , setuserName ] = useState("");
  const [canRegister, setCanRegister] = useState(1);
  const [loginGuestErr,setLoginGuestErr] = useState(loginGuestErrObj);
  let [schoolName , setSchoolName] = useState("");
  let [schoolCode , setSchoolCode] = useState("");
  const [flag , setuserFlag ] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [stateInput , setStateInput] =  useState("");
  const [cityInput , setCityInput] =  useState("");
  const [countryInput , setCountryInput] =  useState("");


  const [searchedStateList , setSearchedStateList]= useState(State.getStatesOfCountry(country));
  const [searchedCityList , setSearchedCityList]= useState([]);
  const [searchedCountryList , setSearchedCountryList]= useState([]);

  const [captchaValue,setCaptchaValue] = useState("");



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


  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
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

  


  
  let emailRegex = /\S+@\S+\.\S+/;
  const dispatch = useDispatch();

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

  let handleSubmit  = function(){
    closeModal();

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
    let dataObj = {
      phone,
      password,
      first_name : firstName,
      last_name : lastName,
    }
    dispatch(register({dataObj}))
    .unwrap()
    .then(() =>{
      console.log('success')
      setLoading(false)
      return <Navigate to="/profile" />;

    })
    .catch((err) =>{
      setLoading(false);
      closeModal();

    })

   

  }

  let handlerForgotPassword = () => {
    setOtpVerified(false);
    setOtpSent(false);
    setFotgetPassword(true);
    setUsernames("")
    setpassword("")

  }

  let handlerForgotUserName= () => {
    setOtpVerified(false);
    setOtpSent(false);
    setFotgetUsername(true);
    setUsernames("");
    setpassword("");
  }

  let  otpForgetUserName = () => {  
      
    if(phone.length !== 10) {
      errorMessage("Please enter valid phone number")
      return;
    }
    setLoading(true);
    dispatch(forgetUserName({phone}))
    .unwrap()

    .then(res => {
      console.log(res);
      let usernames =  [];

      for(let user of res.data){
        console.log(user)
        usernames.push( user.username)
      }
      if(usernames.length === 0){
        setFotgetUsername(false);
        errorMessage("No User found");

      }

      setUsernames(usernames);
      setpassword("");
      setuserName("");
      setOtpVerified(true);
      setLoading(false);

      
    })
    .catch(err => {
      console.log(err);
    })

  }

  let  submitForgetUserName = () =>{
    if(otp.length !== 6) {
      errorMessage("Please enter valid otp")
      return;
    }
    dispatch(getUserName({phone,otp}))
    .unwrap()
    .then(res => {
      console.log(res);
      setUsernames(res.data.map(element => element.username))
      setOtpVerified(true);
      setpassword("");
      setuserName("");
    })
    .catch(err => {
      console.log(err);
    })
  }

  let  otpForgetPassword = () => {
    if(!userName) {
      errorMessage("Please enter valid username")
      return;
    }
    dispatch(forgetP({userName}))
    .unwrap()
    .then(res => {
      console.log(res);
      setOtpSent(true);
    })
    .catch(err => {
      console.log(err);
    })

  }

  let  submitForgetPassword = () =>{
    if(otp.length !== 6) {
      errorMessage("Please enter valid otp")
      return;
    }
    if(!password.length) {
      errorMessage("Please enter valid password")
      return;
    }
    dispatch(resetPassword({userName,otp,password}))
    .unwrap()
    .then(res => {
      console.log(res);
      setOtpSent(false);
      setFotgetPassword(false);
      setOtpVerified(false);
      setpassword("");
      setuserName("");
      toast.success("Password changed, Please login to continue", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

    })
    .catch(err => {
      console.log(err);
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

let instruction = [ '1. This test is based on MCQ pattern',

'2. There can be more than one correct option (even for a single fill in the blanks)',


'3. Time duration : 15 minutes',

'4. Questions : 25',

'5. Marking Scheme : +4 for every right answer & -1 for every wrong answer',

 "6. Passing percentage : 40%",

  "7. After completion of test, you will be redirected to an additional bonus round - 'Spin the wheel' to improve your score",
  "8. There will be no negative marking for the Bonus round",
  "9.  Instant result and certificate after submission of test"]



  let handleGenrateOtp = function(){
    setLoading(true);
    dispatch(genrateOtp({phone}))
    .unwrap()
    .then(() =>{
      console.log('otp sent successfully');
      setIsOtpGenrated(true);
      setLoading(false);

    })
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
    if(!state || !city || !country || (isSchool &&!loginGuest.class) || !language  || !father){  
      errorMessage("Please Fill all  details")
      return;

    }

    if(isSame) {
      handleGuestLoginChange('whats_no',phone)
    }
    setIsLoginGuest(false);
    setModalIsOpenIns(true)




  }
  let handleGuestLoginChange = (key,value) =>{
    let  obj = {};
    obj[key] = value
    setLoginGuest(pre => {
      return {
        ...pre,
        ...obj
      }
    })
  }

  let navigateQuiz = () =>{
    let data = loginGuest;
    if(!data.isSchool) {
      data.category = "Individual"
    }
    else{
      data.category = "School"

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
  let handleOtpSubmit  = function(){

    if(!phone){
      return;
    }
    else{
      let dataObj = {
        phone,
        otp,
        first_name : firstName,
        last_name : lastName,
      }
      setLoading(true);
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
      .catch((err) =>{
        setLoading(false)
      })
    }
    

  }
  let openLoginGuest = () => {
    setCaptcha(""); 
    setValidateCaptcha(false);
    setIsLoginGuest(true);
  }
  let handleLogin = () => {
    if(!userName || userName.length !== 10 || !password ){
      errorMessage("Please enter a valid email and password");
      return;
    }
    setLoading(true);
    dispatch(login({ userName,password}))
      .unwrap()
      .then((res) =>{
        console.log('login',res);
      setLoading(false);

        return <Navigate to="/profile" />;
      })
      .catch((err) =>{
        setLoading(false)
      })
  }


  return (
    loading ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    :
    <div style={{height: '100%'}} className="signup-mobile">
      <div className="mobile-logo" >
        <div>   
          <img alt="main-logo"  src={logo}/>

        </div>
        <h5>
        International Humanity Olympiad
        </h5>

      </div>
      {
        flag === 1 ?
        <div className="box">
        <div className="main-heading">
          <h5>Login</h5>
        </div>
        <div className="form" >
          <div>
             <p>User Name</p> 
             <input value={userName}  onChange={(e) => setuserName(e.target.value)} placeholder="Enter Username"className="form-input" ></input>
               <p className="error-message"  >{firstNameError}</p> 
               <div className="forgot">
               <span onClick={handlerForgotUserName} >Forgot UserName</span>
   
             </div>

          </div>
        
          <div> 
             <p>Password</p>
             <input value={password} disabled={isOtpVerified} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Enter Password" className="form-input" ></input>
             <p className="error-message"  >{passwordError}</p> 
        


          </div>
          <div >
                  <button  onClick={flag === 0  ? handleSubmit : handleLogin} className="form-button"  >Login</button>
            </div>
            <div style={{margin: "15px 0",textAlign: "center"}} >
           <hr></hr>
     </div>
     <div >
           <button  onClick={()=> {setuserFlag(0);}  } className="form-button"  >Create Account</button>
     </div>

        </div>

      </div>
 : canRegister ?  
 <div className="box">
 <div className="main-heading">
   <h5>Sign Up</h5>
 </div>
 <div className="form" >
   <div>
      <p>First Name</p> 
      <input  value={firstName} type="text"disabled={isOtpGenrated ? "disabled" : ""} onChange={(e) => setfirstName(e.target.value)} placeholder="Please enter your First Name"className="form-input" ></input>
        <p className="error-message"  >{firstNameError}</p> 

   </div>
   <div>
      <p>Last Name</p>
      <input value={lastName} disabled={isOtpGenrated ? "disabled" : ""}  onChange={(e) => setlastName(e.target.value)}  placeholder="Please enter your Last Name"className="form-input" ></input>
      <p className="error-message"  >{lastNameError}</p> 
   </div>
   <div className="row" >
     <div  className="col-12" >
       <p>Phone Number</p>
       <input value={phone} disabled={isOtpGenrated ? "disabled" : ""}  onChange={(e) => setphone(e.target.value)}  placeholder="Please enter your Phone Number"className="form-input" ></input>
       <p className="error-message"  >{phoneError}</p> 

     </div>
     {
              isOtpGenrated  ? 
              <div className="col otpDiv">
                <input  value={otp} onChange={(e) => setOtp(e.target.value)}  placeholder="Enter Otp"className="form-input" ></input> 
                <button onClick={handleOtpSubmit} className="form-button" >Verify OTP </button>

              </div>
               : shouldGenrateOtp && !isOtpVerified ? 
               
              <div className="col otpDiv">
               <button onClick={ handleGenrateOtp} className="form-button" >Generate OTP</button>
             </div>
               : <></>
      }
    
    
   </div>
   <div>
            {
             isOtpVerified ?  
             <div>
              {/* <span>Username : {userName}</span> */}
              <p>Password</p>
              <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Enter Password"className="form-input" ></input>
              <p className="error-message"  >{passwordError}</p> 

             </div>

            : <></>

            }
            

        </div>
        <div className="captcha">
              <ClientCaptcha captchaCode={code => setCaptchaValue(code)} />
              <input value={captcha} onChange={(e) => setCaptcha(e.target.value)} placeholder="Captcha"className="form-input" ></input>



         </div>
   <div >
           <button onClick={handleSubmit} className="form-button"  >Register</button>
           <div style={{display : 'inline-block',marginLeft : '10px'}} className="forgot">
                <span onClick={openLoginGuest} >Login as guest</span>

              </div>
     </div>
     
    
     <div style={{margin: "15px 0",textAlign: "center"}} >
     <hr></hr>
     </div>
     <div >
           <button  onClick={()=> setuserFlag(1) } className="form-button"  >Login</button>
     </div>

 </div>

</div> : <div  className="endTime">
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
              <button onClick={handleSubmit} > Okay!</button>

            </div>
          </Modal>

<Modal
isOpen={ forgetPassword}
onRequestClose={() => setFotgetPassword(false)}
style={customStyles}
contentLabel="forget-password"
shouldCloseOnOverlayClick={false}
className="instructions-div forget-modal"
>
  <div onClick={() => setFotgetPassword(false)}  className="close-modal" >

    <FontAwesomeIcon icon={faTimes} />
  </div>

{
  otpSent === false && !otpVerified?
  <div>
     <h5>Forget Password</h5>

  <span class="note" > Username : &nbsp; </span>
  <input placeholder="Enter your username" style={{display: 'inline-block',width: '75%'}} value={userName} onChange={(e) => setuserName(e.target.value)}  type="text" className="form-input"></input>
  <div  class="btnn">
  <button onClick={otpForgetPassword} >Sent otp!</button>
</div>
  </div> : otpSent && !otpVerified  ? 
  <div>
     <h5>Reset Password</h5>
    <p style={{fontWeight:'bold'}} >Enter Otp and new password</p>
    <input placeholder="Enter otp" style={{display: 'inline-block',width: '75%'}} type="text" onChange={(e) => setOtp(e.target.value)} value={otp} className="form-input"></input>
    <div style={{marginTop:'20px'}} ></div>
    <input placeholder="Enter New Password" style={{display: 'inline-block',width: '75%'}} type="text" onChange={(e) => setpassword(e.target.value)} value={password} className="form-input"></input>
   
    <div  class="btnn">
     <button onClick={submitForgetPassword}> Reset Password!</button>
  </div>
  </div> : <div>

  </div>

}

</Modal>


<Modal
isOpen={forgetUsername}
onRequestClose={() => setFotgetUsername(false)}
style={customStyles}
contentLabel="forget-username"
shouldCloseOnOverlayClick={false}
className="instructions-div forget-modal"
>
<div onClick={() => setFotgetUsername(false)}  className="close-modal" >

<FontAwesomeIcon icon={faTimes} />
</div>
        {
  otpSent === false && !otpVerified?
  <div>
     <h5>Forget username</h5>

  <span class="note" > Phone : &nbsp; </span>
  <input placeholder="Please enter your phone no" style={{display: 'inline-block',width: '75%'}} value={phone} onChange={(e) => setphone(e.target.value)}  type="text" className="form-input"></input>
  <div  class="btnn">
  <button onClick={otpForgetUserName} >Submit!</button>
</div>
  </div> : otpSent && !otpVerified  ? 
  <div>
     <h5>Enter Otp</h5>

    <p class="note" > Enter otp</p>
    <input  placeholder="Please enter otp" type="text" onChange={(e) => setOtp(e.target.value)} value={otp} className="form-input"></input>
    <div  class="btnn">
  <button onClick={submitForgetUserName}> Submit!</button>
</div>
  </div> : <div>
  <h5>Associated Users</h5>
  {

    usernames.map((entry,index) =>  {
      return <li  key={index} >{entry}</li>;
    })
    
  }
  <h6 style={{ fontWeight:"bold",marginTop: "20px" }}>  Please note this usernames</h6>
  <div class="btnn" style={{textAlign: "center"}} >
  <button onClick={() => setFotgetUsername(false)}> Noted!</button>

  </div>



  </div>

}
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
          <div>
             <p>Father's  Name</p> 
             <input  value={loginGuest.father} onChange={(e) => handleGuestLoginChange("father",e.target.value)} placeholder="Please enter your Father's Name"className="form-input" ></input>

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
            instruction.map((element,index) =>{
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

export default SignupMobile;
