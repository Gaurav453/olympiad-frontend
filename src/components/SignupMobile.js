import { useEffect ,useState} from 'react';
import {  useDispatch } from 'react-redux';
import { genrateOtp , verifyOtp ,register, login} from "../slices/auth";
import { Navigate } from "react-router-dom";
import logo from '../assets/images/Logo009_min2.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BounceLoader from "react-spinners/BounceLoader";
import Modal from 'react-modal';

const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;


const SignupMobile = () => {

  const [ firstName , setfirstName ] = useState("");
  const [ lastName , setlastName ] = useState("");
  const [ phone , setphone ] = useState("");
  const [ password , setpassword ] = useState("");
  const [ otp , setOtp ] = useState("");

  const [loading , setLoading ] = useState(false);
  const [isOtpGenrated , setIsOtpGenrated ] = useState(false);
  const [isOtpVerified , setIsOtpVerified ] = useState(false);
  const [shouldGenrateOtp , setshouldGenrateOtp ] = useState(false);


  const [firstNameError , serFirstNameError ] = useState("");
  const [lastNameError , serLastNameError ] = useState("");
  const [phoneError , serPhoneError ] = useState("");
  const [passwordError , setpasswordError ] = useState("");

  const [verifyOtpToken , setverifyOtpToken ] = useState("");
  const [userName , setuserName ] = useState("");
  

  const [flag , setuserFlag ] = useState(1);

  const [modalIsOpen, setIsOpen] = useState(false);

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

  


  


  const dispatch = useDispatch();


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
        console.log('success')
        setLoading(false)
        return <Navigate to="/profile" />;

      })
      .catch((err) =>{
        setLoading(false);
        closeModal();

      })
    }

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

  let handleGenrateOtp = function(){
    setLoading(true);
    dispatch(genrateOtp({phone}))
    .unwrap()
    .then(() =>{
      console.log('otp sent successfully');
      setIsOtpGenrated(true);
      setLoading(true);

    })
  }
  
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
    <div style={{height: '90vh'}} className="signup-mobile">
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
             <input  onChange={(e) => setuserName(e.target.value)} placeholder="Please enter your username"className="form-input" ></input>
               <p className="error-message"  >{firstNameError}</p> 

          </div>
          <div> 
             <p>Password</p>
             <input disabled={isOtpVerified} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Please enter your Password" className="form-input" ></input>
             <p className="error-message"  >{passwordError}</p> 


          </div>
          <div >
                  <button  onClick={flag === 0  ? handleSubmit : handleLogin} className="form-button"  >Login</button>
            </div>
            <div style={{margin: "15px 0",textAlign: "center"}} >
           or
     </div>
     <div >
           <button  onClick={()=> setuserFlag(0) } className="form-button"  >Create Account</button>
     </div>

        </div>

      </div>
 :
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
               <button onClick={ handleGenrateOtp} className="form-button" > Generate OTP</button>
             </div>
               : <></>
      }
    
    
   </div>
   <div>
            {
             isOtpVerified ?  
             <div>
              <span>Username : {userName}</span>
              <p>Password</p>
              <input value={password} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Please enter your Password"className="form-input" ></input>
              <p className="error-message"  >{passwordError}</p> 

             </div>

            : <></>

            }
            

        </div>
   <div >
           <button onClick={openModal} className="form-button"  >Register</button>
     </div>
     <div style={{margin: "15px 0",textAlign: "center"}} >
           or
     </div>
     <div >
           <button  onClick={()=> setuserFlag(1) } className="form-button"  >Login</button>
     </div>

 </div>

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
    
    </div>
  );
};

export default SignupMobile;
