import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = ({message,show,setShow}) =>  {
       
        
        //Leave this true since we are not using a button
        console.log(show)
        const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              setShow(true);
              return;
            }
        
            setShow(false);
          };

    return (
        <Snackbar open={show } autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">{message}</Alert>
      </Snackbar>
    )
}

export default AlertMessage