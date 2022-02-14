import {useState} from 'react';
import { useDispatch } from 'react-redux';
import logo from '../assets/images/Logo009_min2.png';
import {  login ,logout} from "../slices/auth";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


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
          console.log('logged in',res);
          return <Navigate to="/" />;

  
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
            isHome ?    
        <div className="col ">
            <div className="form" >
          <div>
                    <span>Username</span>
             <input  value={userName} onChange={(e) => setuserName(e.target.value)} placeholder="Please enter your username"className="form-input" ></input>
                </div>
                <div >
                    <span>Password</span>
                    <input   value={password} type="password" onChange={(e) => setpassword(e.target.value)} placeholder=" Please enter your Password" className="form-input" ></input>
                </div>
                <div >
                    <button disabled={loading}  onClick={handleLogin} className="form-button"  >Login</button>
                </div>
            </div>
        </div> : 

        <div  className="col" style={{textAlign: 'end'}}>
        <button onClick={handleLogout} className="form-button"  >Logout</button>
            
        </div>

        }

    </div>
  );
};

export default LoginBar;
