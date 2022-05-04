import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/images/Logo009_min2.png';
import {university } from '../slices/auth'
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City }  from 'country-state-city';
import Modal from 'react-modal';

import BounceLoader from "react-spinners/BounceLoader";
const override = `
position: relative;
width: 100px;
height: 100px;
display: block;
margin: 0 auto;
border-color: #f0962e;
/* margin-top: 15%; */
/* margin-bottom: 27%; */
margin-left: auto;
margin-right: auto;
margin: auto;
margin-top: 15%;
`;

const ProfilePage = () => {
  

  

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

  let formData = {
    "name" : "",
    "state" : "",
    "city" : "",
    "address"  :"",
    "type" : "",
    "principle_name"  : "",
    "phone_no" : "",
    "email" : "",
    "coordinator_name" : "",
    "coordinator_phone_no" : "",
    "board" : "",
    "affiliation_number" : "",
    "strength" : "",

  }

  let formDataError = {
    "name" : "",
    "state" : "",
    "city" : "",
    "address"  :"",
    "type" : "",
    "principle_name"  : "",
    "phone_no" : "",
    "email" : "",
    "coordinator_name" : "",
    "coordinator_phone_no" : "",
    "board" : "",
    "affiliation_number" : "",
    "strength" : "",

  }


  const [ data , setData ] = useState(formData);

  const [ dataError , setDataError ] = useState(formDataError);


  const [loading , setLoading ] = useState(false);
  const [isOpen , setIsOpen ] = useState(false);


  
  const [stateList,setStateList] = useState(State.getStatesOfCountry('IN'));
  const [cityList,setCityList] = useState([]);

  const [stateInput , setStateInput] =  useState("");
  const [cityInput , setCityInput] =  useState("");

  const [searchedStateList , setSearchedStateList]= useState(State.getStatesOfCountry('IN'));
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

  useEffect(() => {

    
    let re = /^[a-zA-Z0-9]+$/
    console.log(data.code)
    let a = re.test(data.code);
    if(data.code && !re.exec(data.code)){
      setDataError((prev) => {
        return {...prev,
          "code" : "Please enter a valid Code"
        }
      })
    }
    else{
      setDataError((prev) => {
        return {...prev,
          "code" : ""
        }
      })
    }
    console.log(dataError)


  },[data.code])
  


  const dispatch = useDispatch();


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




  let handleSubmit  = function(){
    setLoading(true);

    for(let key in data){

      if(!data[key] && dataError[key] === "" ){
        errorMessage("Please enter all required information");
        setLoading(false);

        return;

      }
      
    }



    dispatch(university(data))
    .unwrap()
    .then(() => {
      setData(formData);
      setLoading(false);
      setIsOpen(true);

      
    })
    .catch(() => {
      console.log('some error occured');
      errorMessage('some error occurred');
      setLoading(false);


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

  let formInputHandler = (key , value) => {
    
    let obj = {
      
    }
    obj[key] = value
    setData((prev) => {
      return {
        ...prev,
        ...obj,
      }
    });

    console.log(data);
    
  }
  let closeModal = () => {

    setIsOpen(false);
    window.location.reload(false);

  }


  return (
    <div className="profile">
      <div className="mobile-logo" >
        <div>   
          <img alt="main-logo"  src={logo}/>

        </div>
        <h5>
        8th International Humanity Olympiad
        </h5>

      </div>
      <div  style={{minHeight:'70vh'}} className="box">
        <div className="main-heading">
          <h1>Institute Registration Portal</h1>
          <h6 style={{color:'gray'}} >The institution form registration is to be filled only by the institution in-charge or coordinator.
           (Not for students)</h6>
        </div>
        { 
           loading ?             
           <BounceLoader color="#f0962e" loading={true} css={override} size={100} />
           : 
           <div className="form" >
              <div className="drop-downs">
               <div className="dropdown">
                 <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {data.type ? data.type :"Category"} 
                 </button>
                 <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                   <button onClick={() => formInputHandler("type","School")} className={data.type  === "School" ? 'dropdown-item active' : 'dropdown-item'}>School</button>
                   <button onClick={() => formInputHandler("type","College")} className={data.type  === "College" ? 'dropdown-item active' : 'dropdown-item'}>College</button>
                   <button onClick={() => formInputHandler("type","Coaching Center")} className={data.type  === "Coaching Center" ? 'dropdown-item active' : 'dropdown-item'}>Coaching Center</button>
                 </div>
               </div>
             </div>

             <div>
                <p>Institute Name</p> 
                <input   onChange={(e) => formInputHandler("name", e.target.value)} placeholder="Please enter  Institute Name"className="form-input" ></input>
                  <p className="error-message"  >{}</p> 
   
             </div>

             <div>
                <p>Institute Address</p> 
                <input onChange={(e) => formInputHandler("address", e.target.value)} placeholder="Please enter  Institute Address"className="form-input" ></input>
                  <p className="error-message"  >{}</p> 
             </div>
   
             <div className="userLocation">
             <div className="drop-downs">
               <div style={{marginBottom: "10px"}} className="dropdown">
                 <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   {data.state ? data.state :"Select State"} 
                 </button>
                 <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                   <div class="dropdown-item" >
                     <input placeholder="Search your state" onChange={(e) => setStateInput(e.target.value)}  value={stateInput} class="form-input" ></input>
                   </div>
                  {
                    searchedStateList.map(entry => {
                      return <button onClick={() => { formInputHandler("state",entry.name);setCityList(City.getCitiesOfState('IN',entry.isoCode)) }} key={entry.isoCode} className={data.state === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                        {entry.name}
   
                        </button>
   
                    })
                  }
                 </div>
               </div>
               {
                 data.state ? 
                 <div className="dropdown">
                 <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 {data.city ? data.city :"Select District"} 
                 </button>
                 <div style={{maxHeight:'500px',overflow:'auto'}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
   
                 <div class="dropdown-item" >
                   <input placeholder="Search your city" onChange={(e) => setCityInput(e.target.value)}  value={cityInput} class="form-input" ></input>
   
                 </div>
   
                  {
                    searchedCityList.map(entry => {
                      return <button onClick={() => formInputHandler("city",entry.name)} key={entry.name} className={data.city === entry.name ? 'dropdown-item active' : 'dropdown-item' } >
                        {entry.name}
   
                        </button>
   
                    })
                  }
                 </div>
                  
               </div>  : <></>
               }
        
          
             </div>
   
             </div>

             <div>
                <p>Education Board</p> 
                <input onChange={(e) => formInputHandler("board", e.target.value)} placeholder="Education Board"className="form-input" ></input>
             </div>

             <div>
                <p>Institute Administration Phone No.</p> 
                <input type="text" inputMode="tel" onChange={(e) => formInputHandler("phone_no", e.target.value)} placeholder="Phone Number"className="form-input" ></input>
             </div>

             <div>
                <p>Institute Email Id</p> 
                <input onChange={(e) => formInputHandler("email", e.target.value)} placeholder="Email Id"className="form-input" ></input>
             </div>

             <div>
                <p>Institute Affiliation Number</p> 
                <input onChange={(e) => formInputHandler("affiliation_number", e.target.value)} placeholder="Affiliation Number"className="form-input" ></input>
             </div>
  
             <div>
                <p>Principal  Name</p> 
                <input onChange={(e) => formInputHandler("principle_name", e.target.value)} placeholder="Please enter Principal Name"className="form-input" ></input>
             </div>
   
             <div>
                <p>Institute Coordinator Name</p> 
                <input onChange={(e) => formInputHandler("coordinator_name", e.target.value)} placeholder="Institute Coordinator Name"className="form-input" ></input>
   
             </div>
   
             <div>
                <p>Institute Coordinator Phone Number</p> 
                <input type="text" inputMode="tel" onChange={(e) => formInputHandler("coordinator_phone_no", e.target.value)} placeholder="Institute Coordinator Phone Number"className="form-input" ></input>
   
             </div>
   
             <div>
                <p>Total strength(5th -12th Class/ College Student)</p> 
                <input  type="text" inputMode="numeric" onChange={(e) => formInputHandler("strength", e.target.value)} placeholder="Total strength"className="form-input" ></input>
   
             </div>
   
             <div >
                     <button onClick={handleSubmit} className="form-button"  >Submit</button>
               </div>
   
           </div>
   
        }
       
      </div>

      <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="instructions"
            shouldCloseOnOverlayClick={false}
            className="instructions-div"
          >
            
            <h5>Note</h5>
              <p class="note" > Thank you for registering your esteemed Institution for the 8th International Humanity Olympiad. Please ensure that you have received the confirmation email from IHO with the unique Olympiad code.</p>
     
            <div  class="btnn">

              <button onClick={closeModal} > Okay!</button>
            </div>
      </Modal>

 

    </div>
  );
};

export default ProfilePage;
