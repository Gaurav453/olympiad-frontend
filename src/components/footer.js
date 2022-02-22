import { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviousAttempts ,activeAttempts } from '../slices/quiz'
import { useNavigate} from "react-router-dom";


const Footer = () => {

  let user = useSelector(state => state.auth);
  const [ totalAttempts , setTotal ] = useState(0);
  const [ active , setActive ] = useState(0);



  const dispatch = useDispatch();



  useEffect(() => {
    previousAttempts()
  })

  let previousAttempts = (v)=>{
    
    dispatch(getPreviousAttempts({sort:0}))
    .unwrap()
    .then((res)=>{
      console.log(res);
      setTotal(res.data.attempts.length);

    })
    .catch(() =>{

    })

    dispatch(activeAttempts({}))
    .unwrap()
    .then((res)=>{
      console.log(res);
      setActive(res);

    })
    .catch(() =>{

    })


  }




  return (
    <div className="footer" >
      <div className="row" >
        <div style={{textAlign: 'center'}} className="col-4">
          Follow us on
        </div>
        <div style={{textAlign: 'center'}} className="col-4">
          Olympiad 
        </div>
        <div style={{textAlign: 'center'}} className="col-12 col-md-4">
        Total Attempts are {totalAttempts} &nbsp;&nbsp;<br></br>Current Active  Attempps are {active} &nbsp;&nbsp;
          
        </div>

      </div>
      

    </div>
  );
};

export default Footer;
