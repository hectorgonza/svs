import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  // Initialize the state variables to store the login status and error message
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loginToken') === 'userIsLoggedIn');
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
  // Save the login status to local storage when it changes
  useEffect(() => {
    if (isLoggedIn) {
      // If the user is logged in, save a login token to local storage
      localStorage.setItem('loginToken', 'userIsLoggedIn');
    } else {
      // If the user is not logged in, remove the login token from local storage
      localStorage.removeItem('loginToken');
    }
  }, [isLoggedIn]);


  return (
    <div>
      {isLoggedIn ? (
         <Navigate to="/home" />
      ) : (
        <>
          <button onClick={handleLogin}>Login with MetaMask</button>
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </div>
  );
}

