import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/images/Logo009_min2.png';
import {saveProfile ,school } from '../slices/auth'
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City }  from 'country-state-city';
import Modal from 'react-modal';



const ProfilePage = () => {
  

  let user = useSelector(state => state.auth);
  user = user?.user;
  const [ email , setEmail] = useState("");
  const [ whatsapp , setWhatsapp ] = useState("");
  const [ phone , setPhone ] = useState(user.phone_no);

  const [ isSame , setisSame ] = useState(false);

  const [ category , setCategory ] = useState("");
  const [modalIsOpen, setIsOpen] = useState(true);
  const [ clas , setClas ] = useState("");
  const [ schoolCode , seschoolCode ] = useState("");
  const [ schoolName , setSchoolName ] = useState("");

  const [ referrer , sereferrer ] = useState("");

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


  const [loading , setLoading ] = useState(false);

  const [emailError , serEmailError ] = useState(false);
  const [whatsappError , setWhatsappError ] = useState(false);

  const [country,setCountry] = useState('IN');
  const [state,setState] = useState('');
  const [city,setCity] = useState('');
  const [father,setFather] = useState('');


  const [stateList,setStateList] = useState(State.getStatesOfCountry(country));
  const [cityList,setCityList] = useState([]);

  const [stateInput , setStateInput] =  useState("");
  const [cityInput , setCityInput] =  useState("");

  const [searchedStateList , setSearchedStateList]= useState(State.getStatesOfCountry(country));
  const [searchedCityList , setSearchedCityList]= useState([]);


  useEffect(() => {
    setSearchedStateList(stateList)
    console.log(searchedStateList);

  },[stateList])

  useEffect(() => {
    setSearchedCityList(cityList)

  },[cityList])

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


  


  const dispatch = useDispatch();

  console.log(user);

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
    let emailRegex = /\S+@\S+\.\S+/;
    if(email !== "" && !emailRegex.test(email)){
      serEmailError("Please enter a valid email");
    }
    else{
      serEmailError(""); 
    }



  },[email])

  useEffect(() => {
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

  useEffect(() => {
    if(isSame){
      setWhatsapp(phone)
    }
    else{
      setWhatsapp("")

    }

  },[isSame,phone]);





  let handleSubmit  = function(){
    if(!father || !state ||  !city || !whatsapp || !email || (category === 'School' && ( clas === ""))){
      errorMessage("Please enter all required information");

      return;
    }
    else if(emailError){
      errorMessage("Please enter a valid email");

    }

    setLoading(true);

    let data = {
      "whats_no" : whatsapp,
      "email" : email,
      "school_code" : schoolCode,
      "ref" : referrer || "none", 
      "class" : clas,
       "state" : state,
       "city" : city,
       "country" : 'India',
       "category" : category,
       "father" : father
    }
    dispatch(saveProfile(data))
    .unwrap()
    .then(() => {
      console.log('navigate to dashbaord')
      return <Navigate to="/dashboard" />;
      
    })
    .catch(() => {
      'some error occured'
    })




  }

  let successMessage =  (message) =>{
    toast.success(message, {
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


  return (
    <div className="profile">
      <div className="mobile-logo" >
        <div>   
          <img alt="main-logo"  src={logo}/>

        </div>
        <h5>
        International Humanity Olympiad
        </h5>

      </div>
      <div className="box">
        <div className="main-heading">
          <h1>Build Your Profile</h1>
        </div>
        <div className="form" >
          <div>
             <p>Email</p> 
             <input onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your Email"className="form-input" ></input>
               <p className="error-message"  >{emailError}</p> 

          </div>
          <div>
             <p>Phone Number : {phone}</p>
          </div>
          <div  style={{display:'flex'}} >
            <div>
              <input onClick={() => setisSame(!isSame)} type="checkbox" />
            </div>
            <div style={{marginLeft:20}}  >
              <span  >Check if WhatsApp  number is same as above</span>
            </div>
          </div>{
            !isSame ? 
            <div>
            <p>WhatsApp Number</p>
            <input   onChange={(e) => setWhatsapp(e.target.value)}  placeholder="Please enter your WhatsApp Phone Number"className="form-input" ></input>
            <p className="error-message"  >{whatsappError}</p> 
          </div> : <></>
          }
          <div>
             <p>Father's  Name</p> 
             <input onChange={(e) => setFather(e.target.value)} placeholder="Please enter your Father's Name"className="form-input" ></input>

          </div>
          <div className="userLocation">
          <div className="drop-downs">
            <div style={{marginBottom: "10px"}} className="dropdown">
              <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {state ? state :"Select State"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div class="dropdown-item" >
                  <input placeholder="Search your state" onChange={(e) => setStateInput(e.target.value)}  value={stateInput} class="form-input" ></input>

                </div>
               {
                 searchedStateList.map(entry => {
                   return <button onClick={() => { setState(entry.name);setCityList(City.getCitiesOfState(country,entry.isoCode)) }} key={entry.isoCode} className={state === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name}

                     </button>

                 })
               }
               
              </div>
            </div>
            {
              state ? 
              <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {city ? city :"Select City"} 
              </button>
              <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">

              <div class="dropdown-item" >
                <input placeholder="Search your city" onChange={(e) => setCityInput(e.target.value)}  value={cityInput} class="form-input" ></input>

              </div>

               {
                 searchedCityList.map(entry => {
                   return <button onClick={() => setCity(entry.name)} key={entry.name} className={city === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                     {entry.name}

                     </button>

                 })
               }
                <button onClick={() => setCity("city","Other")} key={"Other"} className={city === "Other" ? 'dropdown-item active' : 'dropdown-item' }>  Other </button>

              </div>
               
            </div>  : <></>
            }
     
       
          </div>

          </div>
        
          <div className="drop-downs">
            <div className="dropdown">
              <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {category ? category :"Category"} 
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => setCategory("School")} className={category === "School" ? 'dropdown-item active' : 'dropdown-item'}>School</button>
                <button onClick={() => setCategory("College")} className={category === "College" ? 'dropdown-item active' : 'dropdown-item'}>College</button>
                <button onClick={() => setCategory("Individual")} className={category === "Individual" ? 'dropdown-item active' : 'dropdown-item'}>Individual</button>
              </div>
            </div>
            {
              category === "School" ? 
              <div className="dropdown">
              <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                { clas ? clas  :  "Enter Class"}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button onClick={() => setClas("6th")} className={clas === "6th" ? 'dropdown-item active' : 'dropdown-item'}>6th</button>
                <button onClick={() => setClas("7th")} className={clas === "7th" ? 'dropdown-item active' : 'dropdown-item'}>7th</button>
                <button onClick={() => setClas("8th")} className={clas === "8th" ? 'dropdown-item active' : 'dropdown-item'}>8th</button>
                <button onClick={() => setClas("9th")} className={clas === "9th" ? 'dropdown-item active' : 'dropdown-item'}>9th</button>
                <button onClick={() => setClas("10th")} className={clas === "10th" ? 'dropdown-item active' : 'dropdown-item'}>10th</button>
                <button onClick={() => setClas("11th")} className={clas === "11th" ? 'dropdown-item active' : 'dropdown-item'}>11th</button>
                <button onClick={() => setClas("12th")} className={clas === "12th" ? 'dropdown-item active' : 'dropdown-item'}>12th</button>
              </div>
            </div> : <></>
            }
       
          </div>
          {
            category === 'School' ? 
            <div class="school_code" >
            <p>School Code</p>
            <input  onChange={(e) => seschoolCode(e.target.value)} className="form-input" ></input>
            <span>{schoolName}</span>
          </div> : <></>
          }
        
          <div >
            <p>Referrer</p>
            <input  onChange={(e) => sereferrer(e.target.value)} placeholder="Please enter Referrer code or leave blank" className="form-input" ></input>
          </div>
          <div >
                  <button onClick={handleSubmit} className="form-button"  >Submit</button>
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
              <p class="note" > Your user name is <span style={{fontWeight:"bold"}} >{user.username }</span></p>
              <p class="note" > Please note it down. You have to login with this username later.</p>

              <div  class="btnn">

              <button style={{padding : '5px 41px'}} onClick={() => {navigator.clipboard.writeText(user.username );successMessage("Username Copied to clipboard")}} > Copy to Clipboard!</button>
</div>
            <div  class="btnn">

              <button onClick={closeModal} > Okay!</button>
            </div>
      </Modal>

    </div>
  );
};

export default ProfilePage;
