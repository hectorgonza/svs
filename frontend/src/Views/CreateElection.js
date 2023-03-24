import {Button, Container, Form,InputGroup} from 'react-bootstrap';
import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import "react-datepicker/dist/react-datepicker.css";
import {addHours} from '../utils/utils.js'
const initialForm = {
  election: '',
  startTime: '',
  duration: '',
  candidates: {}
};

function CreateElection() {
  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});
  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs(addHours(new Date(), 4)));
  const [newListItem, setNewListItem] = React.useState([]);
  const input = React.useRef();

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      });
  };

  var addToList = e => {
    e.preventDefault();
    if (!newListItem.includes( input.current.value) ){
      setNewListItem([...newListItem, input.current.value]);
      setField('candidates', newListItem)
      input.current.value = ""
    }
    
  };
  var removeFromList = item => {
    
    setNewListItem(newListItem.filter(function(ele){ 
        return ele !== item; 
    }))
    setField('candidates', newListItem)
    console.log(newListItem)
  };

const handleSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      //if(){
      //blockcahin fetch works

      //}else{}
      //redirect to home page with notifcation
    }
  };

  const findFormErrors = () => {
    const { election, startTime, duration, candidates} = form;
    const newErrors = {};

    if (!election || election === '') newErrors.election = 'cannot be blank!';
    /* else if (email.length > 30) newErrors.email = 'email is too long!'; */
    if (!startTime || startTime === '') 
    //else if (){}
    if (!candidates || candidates === []) newErrors.startTime = 'cannot be blank';

    if (!duration || duration === '') newErrors.startTime = 'cannot be blank';
    else 
    return newErrors;
  };
  return (
    <Container>
    <Form className="reduceForm">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name of the election</Form.Label>
        <Form.Control type="name" placeholder="Enter name" />
      </Form.Group>

      {/* Create calendar */}
      <Form.Group className="mb-3" controlId="formBasicStartTime">
        <Form.Label >Start time: </Form.Label>
        <br />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            minDate={startDate}
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEndTime">
        <Form.Label >End time: </Form.Label>
        <br />
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            minDate={endDate}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
            }}
          />
        </LocalizationProvider>
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="formCandidates">
        <Form.Label>Candidates </Form.Label>
        <InputGroup className="mb-3" controlId="formCandidates">
        <Form.Control type="name" ref={input} placeholder="Enter Candidate" />
        <Button type="submit " onClick={addToList}>Add to List</Button>
        </InputGroup>
        <ul>
        {newListItem.map((item, b) => (
          <li key={b}>
            {item} 
            <Button type='button' onClick={() =>removeFromList(item)}> X </Button>
          </li>
          ))}
        </ul>
        </Form.Group>
        

      <Button variant="primary" type="submit"  onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
   </Container>
  );
}

export default CreateElection;