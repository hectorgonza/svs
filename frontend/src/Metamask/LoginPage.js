import { ethers } from 'ethers';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { useMetaMask } from './MetaMaskContext';

export default function LoginPage() {
  const isLoggedIn = useMetaMask();
  const [errorMessage, setErrorMessage] = useState(null);

  async function handleLogin() {
    try {
      // Create a provider to connect to MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
          
      // Request access to the user's Ethereum accounts
      await window.ethereum.enable();
    } catch (error) {
      console.error("Error in handleLogin:", error); // Log the error
      // If an error occurs, save the error message to state
      setErrorMessage(error.message);
    }
  }
  

  return (
    <div>
      {isLoggedIn ? (
         <Navigate to="/" />
      ) : (
        <Row className="show-grid text-center" style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Col xs={12}>
            <Button onClick={handleLogin}>Login with MetaMask</Button>
            {errorMessage && <p>{errorMessage}</p>}
          </Col>
        </Row>
      )}
    </div>
  );
}
