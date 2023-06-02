import * as React from 'react';
import {Container, ListGroup,Button} from 'react-bootstrap';
import {getElections,getElection} from '../Contracts/ElectionFactory'

function Elections (){
    const [elections, SetElection] = React.useState();
    React.useEffect(() => {
        // Your code here
        SetElection(getElections())
      }, []);
   
    
    return (
        <Container>

        <h1 className='mb-3'>Choose Election</h1>

        <ListGroup variant="flush">
           
           {elections.map((id, election) => (
          <ListGroup.Item key={id}> 
            {getElection(id)} 
            
            <Button type='button' className='ms-2' > Vote </Button>
            
            </ListGroup.Item>
         
          ))
            
            

           }
        </ListGroup>

        </Container>

    );
    
}

export default Elections;