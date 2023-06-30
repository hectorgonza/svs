import * as React from 'react';
import {Container, ListGroup,Button} from 'react-bootstrap';
import {getElections} from '../Contracts/ElectionFactory'
import { useNavigate} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loading from '../utils/Loading'

function Elections (){
    let navigate = useNavigate();
    const [elections, SetElection] = React.useState([]);
    const { promiseInProgress } = usePromiseTracker()
  
    React.useEffect(() => {
        
        trackPromise(getElections().then(response => {
            SetElection(response[0])
          }))
         
      }, []);
   
     const voteClick= election => {
        navigate("/vote/" + election)

     }

    if(!promiseInProgress){
      return (
      <Container>

      <h1 className='mb-3'>Choose Election</h1>

      <ListGroup >
      {elections.map((election, id) => (
         <ListGroup.Item key={id}> 
          {election}
          <Button type='button' className='ms-2' onClick={() => voteClick(election)} > Vote </Button>
          
        </ListGroup.Item>  
       ))
        }
         
      </ListGroup>

      </Container>

  );}
  else{
   
    return   <Loading></Loading>
  }
    
    
}

export default Elections;