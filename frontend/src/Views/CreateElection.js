import {Button, Form} from 'react-bootstrap';
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "react-datepicker/dist/react-datepicker.css";
function CreateElection() {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [newListItem, setNewListItem] = React.useState([]);
  const input = React.useRef();
  var addToList = e => {
    e.preventDefault();
    setNewListItem([...newListItem, input.current.value]);
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name of the election</Form.Label>
        <Form.Control type="name" placeholder="Enter name" />
      </Form.Group>
      {/* Create calendar */}
      <Form.Group className="mb-3" controlId="formBasicStartTime">
        <Form.Label >Start time: </Form.Label>
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDuration">
        <Form.Label>Duration in hours: </Form.Label>
        <Form.Control type="name" placeholder="Enter Duration" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formCandidates">
        <Form.Label>Candidates </Form.Label>
        <Form.Control type="name" ref={input} placeholder="Enter Candidate" />
        <Button type="submit" onClick={addToList}>Add to List</Button>
        <ul>
        {newListItem.map((item, b) => (
          <li key={b}>{item}</li>
        ))}
      </ul>
      </Form.Group>
      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateElection;