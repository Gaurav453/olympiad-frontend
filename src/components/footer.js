import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { activeAttempts } from '../slices/quiz'
import face from '../assets/images/face.png';
import what from '../assets/images/WhatsApp.svg.png';
import tele from '../assets/images/telegram.png';




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
                                <a href='https://api.whatsapp.com/send/?text=Hi!%20Let%20us%20pause%20from%20our%20daily%20grind%20for%20just%2015%20minutes%20to%20reflect%20on%20ourselves%20and%20reinforce%20positivity%20within%20us.%20I%20recently%20gave%20Humanity%20Olympiad%20and%20trust%20me%20its%20worth%20a%20try!%20I%20urge%20you%20to%20attempt%20this%20unique%20olympiad%20at%20least%20once.%20This%20is%20open%20for%20all%20not%20just%20students%20but%20any%20one%20can%20give%20this%20exam%20for%20free!%20Remember%20Nothing%20is%20more%20valuable%20than%20morals,%20ethics%20and%20Humanity%20in%20this%20world%20Taking%20part%20in%20this%20morals-based%20Humanity%20Olympiad%20will%20bring%20you%20closer%20to%20the%20world%20of%20virtues%20and%20will%20help%20you%20become%20a%20better%20person...%20Attempt%20now%20at%20www.humanityolympiad.org&app_absent=0' target='_blank'><img  alt="whatsapp" src={what} ></img></a>
                                <a href='https://www.facebook.com/humanityolympiad' target='_blank'><img  alt="facebook" src={face} ></img></a>
                                <a href='https://t.me/internationalhumanityolympiad' target='_blank'><img  alt="facebook" src={tele} ></img></a>

                                
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
