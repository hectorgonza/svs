import { Container, Row, Col, Card } from 'react-bootstrap';

const NotFound = () => {
return (
    <Container>
        <Row>
            <Col>
                <Card className="text-center">
                    <h1 className="display-4">404</h1>
                    <p >Sorry, the page you're looking for doesn't exist.</p>
                </Card>
            </Col>
        </Row>
    </Container>
);
};

export default NotFound;