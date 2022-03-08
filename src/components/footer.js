import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeAttempts } from '../slices/quiz'
import face from '../assets/images/face.jpg';
import what from '../assets/images/WhatsApp.svg.png';



const Footer = () => {

  let user = useSelector(state => state.auth);
  const [ totalAttempts , setTotal ] = useState(0);
  const [ active , setActive ] = useState(0);



  const dispatch = useDispatch();



  useEffect(() => {
    previousAttempts()
  },[])

  let previousAttempts = (v)=>{
    

    dispatch(activeAttempts({}))
    .unwrap()
    .then((res)=>{
      console.log(res);
      setActive(res.active);
      setTotal(res.total);


    })
    .catch(() =>{

    })


  }




  return (
    <div className="footer" >
      <div className="row" >
        <div style={{textAlign: 'center'}} className="col-6 col-md-4">
          <div>
                                <span>          Follow us on
</span>
                                <img  alt="whatsapp" src={what} ></img>
                                <img  alt="facebook" src={face} ></img>


                            </div>
        </div>
        <div style={{textAlign: 'center'}} className="col-6 col-md-4">
          Olympiad 
        </div>
        <div  style={{textAlign: 'center'}} className="col-12 col-md-4 mt-2 mt-md-0">
        Total Attempts are {totalAttempts} &nbsp;&nbsp;<br></br>Current Active  Attempts are {active} &nbsp;&nbsp;
          
        </div>

      </div>
      

    </div>
  );
};

export default Footer;
