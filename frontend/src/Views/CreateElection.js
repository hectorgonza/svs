import {Button, Container, Form,InputGroup} from 'react-bootstrap';
import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AlertMessage  from '../utils/Alert.js';
import "react-datepicker/dist/react-datepicker.css";
import {addHours,addDays} from '../utils/utils.js'

const  pageLoadedOn = new Date()
const initialForm = {
  election: '',
  startTime: new Date(),
  endTime: addHours(new Date(), 4),
  candidates: []
};

function CreateElection() {
  
 
  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});
  const [startDate, setStartDate] = React.useState(dayjs(new Date()));
  const [endDate, setEndDate] = React.useState(dayjs(addHours(new Date(), 1)));
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
    if (!newListItem.includes( input.current.value) && input.current.value !=='' ){
      setNewListItem([...newListItem, input.current.value]);
      setForm({
        ...form,
        candidates: [...newListItem, input.current.value]
      });

      input.current.value = ''
    }
    
  };
  const removeFromList = item => {
    const updatedList = newListItem.filter(ele => ele !== item);
    setNewListItem(updatedList);
    setField('candidates', updatedList);
  };

const handleSubmit = e => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      
      setErrors(newErrors);
      
    } else {
      //if(){
      //blockcahin fetch works
    
      console.log("exito")
      //}else{}
      //redirect to home page with notifcation
    }
  };



  const findFormErrors = () => {
  
    const { election, startTime, endTime, candidates} = form;
    
    const newErrors = {};

    if (!election || election === '') newErrors.election = 'Election Cannot be blank!';
    /* else if (email.length > 30) newErrors.email = 'email is too long!'; */
   
    if (!startTime || startTime === '') newErrors.startTime = 'StartDate cannot be blank!';
    else if (startTime <  pageLoadedOn){  newErrors.startime = 'StartDate cannot be before now' }

    if (!endTime || endTime === '') newErrors.endDate = 'Cannot be blank';
    else if (endTime < startTime){  newErrors.endDate = 'EndDate cannot be before Startdate' }
    
  

    if (!newErrors.startTime || !newErrors.endDate){
      let duration =  Math.floor(Math.abs(endTime - startTime) / 36e5)
      if (duration < 1 ){newErrors.endDate = 'Duration cannot be less than 1h' }
      else if (duration > 96) {newErrors.endDate = 'Duration cannot be more than 4 days' }
    }
    if (!candidates || candidates.length ===  0) newErrors.candidates = 'Cannot be blank';

    return newErrors;
  };


  
  return (
    <Container>
      
      <h1 className='mb-3'>Election creation</h1>

    <Form className="reduceForm">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name of the election</Form.Label>
        <Form.Control type="name" placeholder="Enter name" onChange={(eve) => setField('election',eve.target.value )}/>
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
            minDate={dayjs(new Date())}
            value={startDate}
            onChange={(newValue) => {
              console.log(newValue.toDate().toLocaleString())
              setStartDate(newValue);
              setField('startTime', newValue.toDate())
              setEndDate(addHours(newValue.toDate(), 1))
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
            minDate={addHours(startDate.toDate(), 1)}
            maxDate={addDays(startDate.toDate(),4)}
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue);
              setField('endTime',newValue.toDate())
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
    {((Object.keys(errors).length > 0) &&  <AlertMessage message={JSON.stringify(errors)}/>)}
   </Container>
  );
}

export default CreateElection;