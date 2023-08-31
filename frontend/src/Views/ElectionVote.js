import * as React from 'react';
import {ethers} from "ethers"
import {Container, ListGroup,Button, Row, Col, Modal} from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { getCandidates,sendVote } from '../Contracts/Election';
import Loading from '../utils/Loading'
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../utils/Alert'; 
function ElectionVote (){
    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const [selectedCandidate, setSelectedCandidate] = React.useState(null);
    const [candidates, SetCandidates] = React.useState([]);
    const { promiseInProgress } = usePromiseTracker()

    const navigate = useNavigate()
    const  address = useParams().address

    const voteClick = candidate => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };
    
        const confirmVote = () => {
            trackPromise(
                sendVote(address, selectedCandidate)
                    .then(response => {
                        navigate('/', { state: { showAlert: true } });
                    })
                    .catch(error => {
                        console.error(error);
                        setAlertMessage(error.message || "Error occurred while voting.");
                        setShowAlert(true);
                    })
            );
            setShowModal(false);
        };
        
    
     React.useEffect(() => {
       
        trackPromise(getCandidates(address).then(response => {
            let cand = []
            console.log(response[0])
            response[0].map( candidate => {
               
                cand.push(candidate[0])
                console.log(candidate[0] + ': ' + ethers.BigNumber.from(candidate.numVotes))
                return 0
            });
            console.log(cand)
            SetCandidates(cand)
        }).catch(error => {
            // Handle the error
            console.error(error);
            setAlertMessage(error.message || "Error ocurred while fetching candidates.");
            setShowAlert(true);
          }))
         
      }, []);
    
    if(!promiseInProgress){
        return (
            <Container >
                <h1 className='mb-3'>Choose Candidate </h1>
            <Row className="justify-content-center">
            <Col xs={10} md={6}> 
            

                <ListGroup >
                    
                {candidates.map((candidate, id) => (
                    <ListGroup.Item key={id}> 
                        <Row>
                            <Col>
                                {candidate}
                            </Col>
                            <Col xs="auto"> {/* Esto asegura que la columna sea sólo tan ancha como el contenido */}
                                <Button type='button' className='ms-2' onClick={() => voteClick(candidate.toString())}>Vote</Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>  
                ))}

    
            </ListGroup>
            <AlertMessage 
            message={alertMessage} 
            show={showAlert} 
            setShow={setShowAlert} 
        />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Vote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to vote for {selectedCandidate}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmVote}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>

            </Col>
            </Row>
        </Container>
            )
    }else{

        return   <Loading></Loading>

    }
    
    
    
}

export default ElectionVote;