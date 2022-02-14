import { useEffect ,useState} from 'react';
import { useDispatch } from 'react-redux';
import { genrateOtp , verifyOtp ,register} from "../slices/auth";
import { Navigate,Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';


import useMergedState from '../hooks/MergeState';

import BounceLoader from "react-spinners/BounceLoader";
const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;

const SignupDesktop = () => {

  const [ firstName , setfirstName ] = useMergedState("");
  const [ lastName , setlastName ] = useMergedState("");
  const [ phone , setphone ] = useMergedState("");
  const [ password , setpassword ] = useMergedState("");
  const [ otp , setOtp ] = useMergedState("");

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


  return (
    loading ?
    <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
    :
    <div style={{height: '90vh'}} className="signup-desktop">

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
                    isDetailsFilled() ? openModal() : console.log("Er") }} className="form-button"  >Register</button>
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

    </div>
  );
};

export default SignupDesktop;
