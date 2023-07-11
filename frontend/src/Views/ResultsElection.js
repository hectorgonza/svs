import * as React from 'react';
import {ethers} from "ethers"
import {Container} from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import { getCandidates } from '../Contracts/Election';
import Loading from '../utils/Loading'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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
    
    
    ChartJS.register(ArcElement, Tooltip, Legend);
    
    
    
     React.useEffect(() => {
       
        trackPromise(getCandidates(address).then(response => {
            let cand = []
            let votes = []

            response[0].map( candidate => {
                
                cand.push(candidate[0])
                votes.push (ethers.BigNumber.from(candidate.numVotes).toString())
                console.log(candidate[0] + ': ' + ethers.BigNumber.from(candidate.numVotes))
                return 0
            });
            data.labels = cand;
            data.datasets[0].data = votes;
            setData(data)
            console.log(data)
        }))
         
      }, []);
    
    if(!promiseInProgress){
        return (
            <Container>
            <h1 className='mb-3'> Results of the Election </h1>

            <Container style={{width: '600px'}}>
              <Doughnut data={data}  options={{
              responsive: true,
              maintainAspectRatio: true,
               }}/>
            </Container>
        </Container>
            )
    }else{

        return   <Loading></Loading>

    }
    
    
    
}

export default ResultsElection;