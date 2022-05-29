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
  const [ schoolCode , setSchoolCode ] = useState(user?.school_code);

  const [ canSave , setCanSave ] = useState(false);

  const [isSchoolStudent , setIsSchool] = useState(false);


  const [ canEdit , setCanEdit ] = useState(false);

  const dispatch = useDispatch();



  let getuserSchool = function(){
    dispatch(userSchool({}))
    .unwrap()
    .then((res) => {
      if(res.data?.name){
        setSchoolName(res.data?.name);
        setSchoolCode(res.data?.code);
      }
      else{
        setCanEdit(true);
      }
      
    })
  }
 
  useEffect(() => {
    if(!user) return;
    getuserSchool();
    console.log(localStorage.getItem('user'));
    let category = JSON.parse(localStorage.getItem('user') || "")?.category;
    console.log(category);
    if(category === 'School'){
      setIsSchool(true);                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }

  },[])
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
  let guest = localStorage.getItem('guest');

  if(guest === 'true'){
    navigate('/')
  }
  
  useEffect(() => {
    if(! schoolCode) return
    if(!user) return;
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
      console.log(canSave);
    })
  },[schoolCode])
  if(!user){
    return <Navigate to="/" />;

  }


  let handleSubmit  = function(){
    if(!canEdit) {
      errorMessage("You cannot update your school");
      return;

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
            isSchoolStudent ?  <div>
            <p>School Olympiad Code</p> 
            <input disabled={canEdit ? false : 'disabled'} value={schoolCode}  placeholder="Enter Your School Olympiad Code" onChange={(e) => setSchoolCode(e.target.value)} className="form-input" ></input>
            {
              schoolName ? <span style={{fontWeight: 'bold'}} >School Name is {schoolName}</span> : <></>
            }
      
         </div> : <></>
          }
         
        

          <div style={{marginTop : "10px",textAlign : "center"}} >
                  <button onClick={handleSubmit} className="form-button"  >Save</button>
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
