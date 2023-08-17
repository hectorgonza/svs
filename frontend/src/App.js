import { Routes,  Route } from 'react-router-dom';
import CreateElection from './Views/CreateElection';
import Home from './Views/Home';
import NotFound from './Views/NotFound';
import LoginPage from './Metamask/LoginPage';
import Elections from './Views/Elections';
import ElectionVote from './Views/ElectionVote';
import ResultMenu from './Views/ResultMenu';
import ResultsElection from './Views/ResultsElection';
import PrivateRoute from './Metamask/PrivateRoute';



export default function App() {
  

    return (
      <Routes>
        <Route  path="/" element={<PrivateRoute  element={<Home/>}/>} ></Route>

        
        <Route path="/election" element={<PrivateRoute  element={<CreateElection/>}/>} />

        <Route path="/vote" element={<PrivateRoute  element={<Elections/>}/>} />
        <Route path="/vote/:address" element={<PrivateRoute  element={<ElectionVote/>}/>} />

        <Route path="/results" element={<PrivateRoute  element={<ResultMenu/>}/>} />
        <Route path="/results/:address" element={<PrivateRoute  element={<ResultsElection/>}/>} />

        <Route path="/login" element={<LoginPage/>} ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    )

}


