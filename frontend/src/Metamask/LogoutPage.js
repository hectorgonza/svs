import { useState } from 'react';
import { Col, Row, Button, Alert } from "react-bootstrap";

export default function LogOut() {
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = async () => {
        if(window.ethereum) {
          setShowAlert(true);
          
        }      
    }

    return(
        <div>
            <Row className="show-grid" style={{position: 'absolute', top: '10px', right: '10px'}}>
                <Col xs={12}>
                    <Button onClick={handleClick}>Logout</Button>
                </Col>
            </Row>
            {showAlert && (
                <Alert variant="info">
                    To fully disconnect from MetaMask, please open your MetaMask extension and disconnect from this site.
                </Alert>
            )}
        </div>
    )
}
