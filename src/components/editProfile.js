import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editSchool ,school,userSchool } from '../slices/auth'
import { Navigate, useNavigate ,Link} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginBar from './LoginBar'


const EditProfile = () => {

  let user = useSelector(state => state.auth);
  user = user?.user;
  const [ schoolName , setSchoolName ] = useState("");
  const [ schoolCode , setSchoolCode ] = useState(user.school_code);

  const [ canSave , setCanSave ] = useState(false);

  const dispatch = useDispatch();



  let getuserSchool = function(){
    dispatch(userSchool({}))
    .unwrap()
    .then((res) => {
      if(res.data?.name){
        setSchoolName(res.data?.name)
      }
      
    })
  }
  useEffect(() => {
    getuserSchool();

  })
  const navigate = useNavigate();

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

  useEffect(() => {
    setCanSave(true)
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
  },[schoolCode,dispatch])

  let handleSubmit  = function(){
    if(!canSave) {
      errorMessage("You cannot update your school")

    }
    dispatch(editSchool({code : schoolCode}))
    .unwrap()
    .then(res => {
      toast.error("School Saved Successfully!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        navigate('/dashboard');
  

    })
    .catch(err => {

    })






  }



  return (
    <div className="">
      <LoginBar login={false} />
      <div className="editProfile" >
        <div className="box" >
        <div style={{textAlign: 'center',marginBottom:'10px'}} className="main-heading">
          <h1>Edit Your Profile</h1>
        </div>
        <div className="form" >
          <div>
             <p>First Name</p> 
             <input disabled="disabled" value={user.first_name} className="form-input" ></input>
          </div>
          <div>
             <p>Last Name</p> 
             <input  disabled="disabled"  value={user.last_name}   className="form-input" ></input>
          </div>
          <div>
             <p>Phone</p> 
             <input disabled="disabled" value={user.phone_no}  className="form-input" ></input>
          </div>
          <div>
             <p>Email</p> 
             <input disabled="disabled" value={user.email}   className="form-input" ></input>
          </div>
          {
            schoolCode ?  <div>
            <p>School Code</p> 
            <input value={schoolCode}   className="form-input" ></input>
            {
              schoolName ? <span style={{fontWeight: 'bold'}} >School Name is {schoolName}</span> : <></>
            }
      
         </div> : <></>
          }
         
        

          <div style={{marginTop : "10px",textAlign : "center"}} >
                  <button disabled={canSave ? 'disabled' : ""} onClick={handleSubmit} className="form-button"  >Save</button>
                  <br></br>
            <Link to="/dashboard">Back to Dashboard</Link>

            </div>


        </div>

        </div>

      </div>

     </div>
  );
};

export default EditProfile;
