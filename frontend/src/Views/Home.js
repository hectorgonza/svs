import {  Row, Col, Button } from 'react-bootstrap';
import LogOut from '../Metamask/LogoutPage';
import { useNavigate} from 'react-router-dom';
export default function Home() {
    
     let navigate = useNavigate()
    return (
        
       
        <div>
          
        <LogOut></LogOut>
          <Row className="show-grid text-center" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Col xs={12}>
            <Row>
              <Col xs={12} style={{ marginBottom: '20px'}}>
                <Button onClick={() => navigate("/vote")}>Vote</Button>
              </Col>
              <Col xs={12} style={{ marginBottom: '20px'}}>
                <Button onClick={() => navigate("/election")}>Create Election</Button>
              </Col>
              <Col xs={12}>
                <Button onClick={() => navigate("/results")}>Results</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
      
    );
    }