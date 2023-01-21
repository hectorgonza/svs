import { Col, Row, Button } from "react-bootstrap";

export default function LogOut() {


        return(


        <Row className="show-grid" style={{position: 'absolute', top: '10px', right: '10px'}}>
            <Col xs={12}>
                <Button onClick={() =>{
                localStorage.removeItem('loginToken');
                window.location.reload();
                }}>Log out</Button>
            </Col>
        </Row>



        )



}