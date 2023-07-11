import {  Row, Col, Button } from 'react-bootstrap';
import React from 'react';
import LogOut from '../Metamask/LogoutPage';
import { useNavigate,useLocation} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';


export default function Home() {
  const location = useLocation();
  const [showAlert, setShowAlert] = React.useState(false);
  let navigate = useNavigate()

  React.useEffect(() => {
    if (location.state && location.state.showAlert) {
      setShowAlert(true);
      location.state.showAlert = false;
      window.history.replaceState(null, '');
    }
  }, [location.state]);
  
  const handleAlertClose = () => {
    setShowAlert(false);
  };
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

              {showAlert && <Alert  variant="primary" onClose={handleAlertClose} dismissible style={{position: 'absolute', bottom: '0', left: '0'
                , margin: '10px', width: '400px'  }}>   Successfully done!</Alert>}
            </Row>
          </Col>
        </Row>
        </div>
      
    );
    }