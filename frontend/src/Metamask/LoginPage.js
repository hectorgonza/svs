import { ethers } from 'ethers';
import { useState } from 'react';

export default function LoginPage() {
  // Initialize the state variables to store the login status and error message
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('No error');

  async function handleLogin() {
    try {
      // Create a provider to connect to MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        
      // Request access to the user's Ethereum accounts
      await window.ethereum.enable();

      // Set the login status to true
      setIsLoggedIn(true);
    } catch (error) {
      // If an error occurs, save the error message to state
      setErrorMessage(error.message);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <>
          <button onClick={handleLogin}>Login with MetaMask</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </div>
  );
}

