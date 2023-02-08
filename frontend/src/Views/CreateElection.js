import {Button, Form} from 'react-bootstrap';


function CreateElection() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name of the election</Form.Label>
        <Form.Control type="name" placeholder="Enter name" />
      </Form.Group>
      {/* Create calendar */}
      <Form.Group className="mb-3" controlId="formBasicStartTime">
        <Form.Select>Start time:</Form.Select>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCandidates">
        <Form.Check type="input" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateElection;