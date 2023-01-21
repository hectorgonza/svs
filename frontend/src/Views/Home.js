import {  Row, Col, Button } from 'react-bootstrap';
import LogOut from '../Metamask/LogoutPage';

export default function Home() {
    
    
    return (
        
       
        <div>
          
        <LogOut></LogOut>
          <Row className="show-grid text-center" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Col xs={12}>
            <Row>
              <Col xs={12} style={{ marginBottom: '20px'}}>
                <Button onClick={() => console.log('Vote')}>Vote</Button>
              </Col>
              <Col xs={12} style={{ marginBottom: '20px'}}>
                <Button onClick={() => console.log('Create Election')}>Create Election</Button>
              </Col>
              <Col xs={12}>
                <Button onClick={() => console.log('Results')}>Results</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
      
    );
    }