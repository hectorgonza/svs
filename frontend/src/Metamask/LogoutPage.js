import { Col, Row, Button } from "react-bootstrap";

export default function LogOut() {

    const handleClick = async () => {
        if(window.ethereum) {
          await window.ethereum.enable();
          window.ethereum.selectedAddress = null;
          localStorage.removeItem('loginToken');
          window.window.location.reload();
           
        }
            
    }
        return(


        <Row className="show-grid" style={{position: 'absolute', top: '10px', right: '10px'}}>
            <Col xs={12}>
            <Button onClick={handleClick}>Logout</Button>
  
            </Col>
        </Row>

        )
}