import {useState , useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import logo from '../assets/images/Logo009_min2.png';
import {  login ,logout , forgetUserName, forgetPassword as forgetP, getUserName, resetPassword } from "../slices/auth";
import { Navigate ,Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



import BounceLoader from "react-spinners/BounceLoader";
const override = `
  display: block;
  margin: 0 auto;
  border-color: #f0962e;
  margin-top: 50%
`;
const LoginBar = ({isHome}) => {
    const [userName , setuserName ] = useState("");
    const [ password , setpassword ] = useState("");
  const [loading , setLoading ] = useState(false);
  const [otpSent , setOtpSent] = useState(false);
  const [otpVerified , setOtpVerified] = useState(false);
  const [phone , setPhone] = useState("");
  const [otp , setOtp] = useState("");
  const [usernames , setUsernames] = useState([]);

  let user = useSelector(state => state.auth);
  user = user.user;

  


useEffect(() => {
  console.log(user);
})



  const [forgetUsername,setFotgetUsername] = useState(false);;
  const [forgetPassword,setFotgetPassword] = useState(false);;

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

    let handleLogin = () => {
        if(!userName || !password){
            toast.error("Please enter username and password", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "dark",
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        }
        setLoading(true);
        dispatch(login({ userName,password}))
          .unwrap()
          .then((res) =>{
          setLoading(false);

            console.log('logged in',res);
            return <Navigate to="/profile" />;

    
          })
          .catch((err) =>{
          setLoading(false);


          })
      }
    let handleLogout = () => {
        dispatch(logout())
        .unwrap()
        .then((res) =>{
          console.log('logged out',res);
          return <Navigate to="/" />;

  
        })

    }

    let handlerForgotPassword = () => {
      setOtpVerified(false);
      setOtpSent(false);
      setFotgetPassword(true);
      setPhone("");
      setUsernames("")
      setpassword("")

    }

    let handlerForgotUserName= () => {
      setOtpVerified(false);
      setOtpSent(false);
      setFotgetUsername(true);
      setPhone("");
      setUsernames("")
      setpassword("")
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
      
        console.log(res);
        let usernames =  [];

        for(let user of res.data){
          console.log(user)
          usernames.push( user.username)
        }

        setUsernames(usernames);
        setpassword("");
        setuserName("");
        setOtpVerified(true);

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

  return (
    <div style={{width : "100vw"}} className=" row login-bar">
        <div className="col-1 logo">
            <div>   
                <img alt="main-logo"  src={logo}/>

            </div>

        </div>
        {
            isHome === true ?    
        <div className="col ">
            <div className="form" >
              <div>
              <div>
              <span>Username</span>
              <input  value={userName} onChange={(e) => setuserName(e.target.value)} placeholder="Enter Username"className="form-input" ></input>
              <div className="forgot">
                <span onClick={handlerForgotUserName} >Forgot UserName</span>

              </div>
            </div>
         
                </div>
          <div>
            <div >
                <span>Password</span>
                <input   value={password} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Enter Password" className="form-input" ></input>

            </div>
        
          </div>
                <div >
                    <button disabled={loading}  onClick={handleLogin} className="form-button"  >Login</button>
                </div>
            </div>
        </div> : isHome == false ?

        <div  className="col" style={{textAlign: 'end'}}>
          <div className="profileIcon" > 
            <Link to="/editProfile">{user.username}
            <FontAwesomeIcon icon={faUser} ></FontAwesomeIcon>
            
            </Link>

          </div>
        <button onClick={handleLogout} className="form-button"  >Logout</button>
            
        </div> : <></>

        }

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
              <input placeholder="Please enter your phone no" style={{display: 'inline-block',width: '75%'}} value={phone} onChange={(e) => setPhone(e.target.value)}  type="text" className="form-input"></input>
              <div  class="btnn">
              <button onClick={otpForgetUserName} >Submit</button>
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
                // {usernames}
                usernames.map((entry,index) =>  {
                  return <li  key={index} >{entry}</li>;
                })
                
              }
              <h6 style={{ fontWeight:"bold",marginTop: "20px" }}>  Please note these usernames</h6>
              <div class="btnn" style={{textAlign: "center"}} >
              <button onClick={() => setFotgetUsername(false)}> Noted!</button>

              </div>



              </div>

            }
          </Modal>

    </div>
  );
};

export default LoginBar;
