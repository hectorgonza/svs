import * as React from 'react';
import {Container, ListGroup,Button} from 'react-bootstrap';
import {getElections,getElection} from '../Contracts/ElectionFactory'

function Elections (){
    const [elections, SetElection] = React.useState([]);
    React.useEffect(() => {
        // Your code here
     getElections().then(response => SetElection(response[0]))
    
        console.log(elections)
      }, []);
   
    if(elections !== []){
      return (
      <Container>

      <h1 className='mb-3'>Choose Election</h1>

      <ListGroup >
      {elections.map((election, id) => (
         <ListGroup.Item key={id}> 
          {getElection(id)}
          <Button type='button' className='ms-2' > Vote </Button>
          
        </ListGroup.Item>  
       ))
        }
         
      </ListGroup>

      </Container>

  );}
  else{
    return  <h1 className='mb-3'>Loading</h1>
  }
    
    
}

export default Elections;