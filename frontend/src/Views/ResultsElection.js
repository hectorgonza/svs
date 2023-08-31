import * as React from 'react';
import {ethers} from "ethers"
import {Container} from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { getCandidates } from '../Contracts/Election';
import Loading from '../utils/Loading'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import AlertMessage from '../utils/Alert';
const defaultdata = {
    labels: [],
    datasets: [
      {
        label: 'Nº of Votes',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
function ResultsElection (){

   const  address = useParams().address
   const { promiseInProgress } = usePromiseTracker()
   const [data,setData] = React.useState(defaultdata)
   const [showAlert, setShowAlert] = React.useState(false);
   const [alertMessage, setAlertMessage] = React.useState("");
    
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    
    
     React.useEffect(() => {
       
        trackPromise(getCandidates(address).then(response => {
            let cand = []
            let votes = []
            console.log(response)
            response[0].map( candidate => {
                
                cand.push(candidate[0])
                votes.push (ethers.BigNumber.from(candidate.numVotes).toString())
                console.log(candidate[0] + ': ' + ethers.BigNumber.from(candidate.numVotes))
                return 0
            });
            let aux = data
            aux.labels = cand;
            aux.datasets[0].data = votes;
            setData(aux)
            console.log(data)
        }).catch(error => {
          // Handle the error
          console.error(error);
          setAlertMessage(error.message || "Error occurred while voting.");
          setShowAlert(true);
        }))
         
      }, []);
    
      if(!promiseInProgress){
        return (
            <Container>
                <h1 className='mb-3'> Results of the Election: </h1>

                <Container style={{width: '90%', height: '400px'}}>
                    <Doughnut data={data}  options={{ 
                        responsive: true, 
                        maintainAspectRatio: false 
                    }}/>
                </Container>
                <AlertMessage 
                    message={alertMessage} 
                    show={showAlert} 
                    setShow={setShowAlert} 
                />
            </Container>
        )
    }
    else {
        return <Loading></Loading>
    }
    
    
    
}

export default ResultsElection;