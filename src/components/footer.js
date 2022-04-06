import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeAttempts } from '../slices/quiz'
import face from '../assets/images/face.png';
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
        <div style={{textAlign: 'center'}} className="col-12 col-md-6">
          <div style={{marginLeft:"19px"}} >
                                <span>          Follow us on
</span>
                                <a href='https://www.facebook.com/humanityolympiad' target='_blank'><img  alt="whatsapp" src={what} ></img></a>
                                <a href='https://www.facebook.com/humanityolympiad' target='_blank'><img  alt="facebook" src={face} ></img></a>


                            </div>
        </div>

        <div  style={{textAlign: 'center'}} className="col-12 col-md-6 mt-2 mt-md-0">
        Total Attempts are {totalAttempts} &nbsp;&nbsp;<br></br>Current Active  Attempts are {active} &nbsp;&nbsp;
          
        </div>

      </div>
      

    </div>
  );
};

export default Footer;
