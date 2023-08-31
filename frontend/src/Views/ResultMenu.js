import * as React from 'react';
import {Container, ListGroup,Button, Row, Col} from 'react-bootstrap';
import { getElections} from '../Contracts/ElectionFactory'
import { useNavigate} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loading from '../utils/Loading'
import AlertMessage from '../utils/Alert';
function ResultMenu (){
    let navigate = useNavigate();
    const [elections, SetElection] = React.useState([]);
    const { promiseInProgress } = usePromiseTracker()
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    React.useEffect(() => {
        
        trackPromise(getElections().then(response => {
          console.log (response)
            SetElection(response[0])
          }).catch(error => {
            // Handle the error
            console.error(error);
            setAlertMessage(error.message || "Error occurred while voting.");
            setShowAlert(true);
          }))
         
      }, []);
   
     const voteClick= election => {
        navigate("/results/" + election)

     }

    if(!promiseInProgress){
      return (
      <Container>

      <h1 className='mb-3'>Choose Election</h1>
      <Row className="justify-content-center">
            <Col xs={10} md={6}> 
      <ListGroup >
      {elections.map((election, id) => (
         <ListGroup.Item key={id}> 
          
          <Row>
                <Col>
                  {election}
                </Col>
                <Col xs="auto"> {/* Esto asegura que la columna sea sólo tan ancha como el contenido */}
                  <Button type='button' className='ms-2' onClick={() => voteClick(election)} > View Results </Button>

                </Col>
            </Row>
        </ListGroup.Item>  
       ))
        }
         
      </ListGroup>
      <AlertMessage 
            message={alertMessage} 
            show={showAlert} 
            setShow={setShowAlert} 
        />
      </Col>
      </Row>
      </Container>

  );}
  else{
   
    return   <Loading></Loading>
  }
    
    
}

export default ResultMenu;