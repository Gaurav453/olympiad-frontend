import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { genrateOtp , verifyOtp ,register , loginGuest as lg} from "../slices/auth";
import { Navigate,Link ,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { Country, State, City }  from 'country-state-city';
import { faTimes } from '@fortawesome/free-solid-svg-icons';





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
    "firstName": "Gaurav",
    "lastName" : "ak",
    "phone" : "8787878787",
    "whats_no":"8787878787",
    "email" : "g@g.com",
    "state" : "Delhi",
    "city" : "Delhi",
    "country" : "India",
    "userip": "",
    "language" : "ENGLISH"

  }

  const [ firstName , setfirstName ] = useMergedState("");
  const [ lastName , setlastName ] = useMergedState("");
  const [ phone , setphone ] = useMergedState("");
  const [ password , setpassword ] = useMergedState("");
  const [ otp , setOtp ] = useMergedState("");
  const [ isSame , setisSame ] = useState(false);


  let [loading , setLoading ] = useMergedState(false);
  const [isOtpGenrated , setIsOtpGenrated ] = useMergedState(false);
  const [isOtpVerified , setIsOtpVerified ] = useMergedState(false);
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
  const [isLoginGuest,setIsLoginGuest] = useState(false);


  const [country,setCountry] = useState();
  const [state,setState] = useState('');
  const [city,setCity] = useState('');

  const [countryList,setCountryList] = useState(Country.getAllCountries());
  const [stateList,setStateList] = useState([]);
  const [cityList,setCityList] = useState([]);

///State.getStatesOfCountry(country)

let instruction = [ '1. This test is based on MCQ pattern',

'2. There can be more than one correct option (even for a single fill in the blanks)',


'3. Time duration : 15 minutes',

'4. Questions : 25',

'5. Marking Scheme : +4 for every right answer & -1 for every wrong answer',

 "6. Passing percentage : 40%",

  "7. After completion of test, you will be redirected to an additional bonus round - 'Spin the wheel' to improve your score",
  "8. There will be no negative marking for the Bonus round",
  "9.  Instant result and certificate after submission of test"]


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

  useEffect(() => {
    if(phone.length === 10) {
      setshouldGenrateOtp(true)
    }
    else{
      setshouldGenrateOtp(false)

    }
    setIsOtpGenrated(false);
    setIsOtpVerified(false);



  },[phone,firstName,lastName])

 
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

  let handleLoginGuest = function(){
    let {firstName, lastName,phone,email,whats_no,state,city,country} = loginGuest;
    console.log(isSame);
    if(!firstName || !lastName || !phone || !email || (!whats_no && !isSame) || !state || !city || !country){  
      errorMessage("Please Fill all correct details")
      return;

    }
    if(phone.length !== 10 ||( whats_no.length >0 && whats_no.length !==10 )){
      errorMessage("Please enter valid phone no")
      return;

    }
    if(!emailRegex.test(email)){
      errorMessage("Please enter valid email")
      return;
    }
    if(isSame) {
      handleGuestLoginChange('whats_no',phone)
    }
    setIsLoginGuest(false);
    setModalIsOpenIns(true)




  }

  let handleSubmit  = function(){

    closeModal();

      setLoading(true);

      let dataObj = {
        phone,
        password,
        first_name : firstName,
        last_name : lastName,
      }
      dispatch(register({verifyOtpToken,dataObj}))
      .unwrap()
      .then(() =>{
      setLoading(false);

        console.log('success')
      })
      .catch(() =>{
        setLoading(false);
        closeModal();
  
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
  }

  let navigateQuiz = () =>{
    dispatch(lg(loginGuest))
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

  return (
    loading ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    :
    <div style={{height: '100%'}} className="signup-desktop">

      <div className="box">
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
             <div>
              <span style={{fontSize: "16px" , fontWeight: "bold",marginBottom: "8px",display:"block"}} >Username : {userName}</span>
              <p>Password</p>
              <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Please enter your Password"className="form-input" ></input>
              <p className="error-message"  >{passwordError}</p> 

             </div>

            : <></>

            }
            

          </div>
          <div  >
                  <button  onClick={() => { 
                    isDetailsFilled() ? openModal() : console.log("Er") }} className="form-button"  >Register</button> or 
              <div style={{display : 'inline-block',marginLeft : '10px'}} className="forgot">
                <span onClick={() => setIsLoginGuest(true)} >Login as guest</span>

              </div>
            </div>
            

        </div>

      </div>
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

          </div>
          <div>
             <p>Last Name</p>
             <input  value={loginGuest.lastName}  onChange={(e) => handleGuestLoginChange("lastName",e.target.value)}  placeholder="Please enter your Last Name"className="form-input" ></input>
          </div>
          <div>
              <p>Phone Number</p>
             <input  value={loginGuest.phone}  onChange={(e) => handleGuestLoginChange("phone",e.target.value)}  placeholder="Please enter your Phone Number"className="form-input" ></input>

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
          </div> : <></>
          }
          <div>
             <p>Email</p> 
             <input  value={loginGuest.email}  onChange={(e) => handleGuestLoginChange("email",e.target.value)} placeholder="Please enter your Email"className="form-input" ></input>
          </div>
   

 <div className="userLocation">
          <p style={{marginTop: '10px',fontWeight: 'bold'}}>Select Your Country state and city</p>
          <div className="drop-downs">
          <div style={{marginRight : "10px"}} className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {loginGuest.country ? loginGuest.country :"Select Country"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
               {
                 countryList.map(entry => {
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
               {
                 stateList.map(entry => {
                   return <button onClick={() => { handleGuestLoginChange('state',entry.name);setCityList(City.getCitiesOfState(entry.countryCode,entry.isoCode)) }} key={entry.isoCode} className={state === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name + entry.countryCode}

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
               {
                 cityList.map(entry => {
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

          <div style={{marginTop : '20px'}} className="dropdown">
              <button className="bg-main text-white px-2 py-1 rounded-lg dropdown-toggle form-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { loginGuest.language  ? loginGuest.language : "Select Language" }
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => handleGuestLoginChange("language","ENGLISH")} className={loginGuest.language === "ENGLISH" ? 'dropdown-item active' : 'dropdown-item'}>English</button>
                <button onClick={() =>  handleGuestLoginChange("language","HINDI")} className={loginGuest.language === "HINDI" ? 'dropdown-item active' : 'dropdown-item'}>Hindi</button>
                <button onClick={() =>  handleGuestLoginChange("language","PUNJABI")} className={loginGuest.language === "PUNJABI" ? 'dropdown-item active' : 'dropdown-item'}>Punjabi</button>
              </div>
            </div>
        </div>

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

export default SignupDesktop;
