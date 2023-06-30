import * as React from 'react';
import {ethers} from "ethers"
import {Container, ListGroup,Button} from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { getCandidates,sendVote } from '../Contracts/Election';
import Loading from '../utils/Loading'


function ElectionVote (){

    const  address = useParams().address
    const [candidates, SetCandidates] = React.useState([]);
    const { promiseInProgress } = usePromiseTracker()
   
    const voteClick = candidate => {
        console.log(candidate)

      sendVote(address, candidate).then( response => (

        console.log(response)
       ))

     }
    
     React.useEffect(() => {
       
        trackPromise(getCandidates(address).then(response => {
            let cand = []
           
            response[0].map( candidate => {
               
                cand.push(candidate[0])
                console.log(candidate[0] + ': ' + ethers.BigNumber.from(candidate.numVotes))
                return 0
            });
            console.log(cand)
            SetCandidates(cand)
        }))
         
      }, []);
    
    if(!promiseInProgress){
        return (
            <Container>
            <h1 className='mb-3'>Vote </h1>

                <ListGroup >
                    
                    {candidates.map((candidate, id) => (
                    <ListGroup.Item key={id}> 
                    {candidate}
                    <Button type='button' className='ms-2' onClick={() => voteClick(candidate.toString())} > Vote </Button>
                    </ListGroup.Item>  
                    ))
                    }
                
            </ListGroup>
        </Container>
            )
    }else{

        return   <Loading></Loading>

    }
    
    
    
}

export default ElectionVote;