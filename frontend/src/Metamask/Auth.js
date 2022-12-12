import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';

function Auth() {
  // Initialize the state variables to store the user's Ethereum address and login status
  const [userAddress, setUserAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Connect to Metamask when the component mounts
  useEffect(() => {
    async function connectToMetamask() {
      // Create a provider to connect to Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        
      // Request access to the user's Ethereum accounts
      await window.ethereum.enable();

      // Get the user's Ethereum address
      const [address] = await provider.listAccounts();

      // Save the user's Ethereum address to state
      setUserAddress(address);
    }
    connectToMetamask();
  }, []);

  // Check if the user is logged in every 5 seconds
  useEffect(() => {
    if (userAddress) {
      // If the user's Ethereum address is saved to state,
      // set the login status to true
      setIsLoggedIn(true);
    } else {
      // If the user's Ethereum address is not saved to state,
      // set the login status to false
      setIsLoggedIn(false);
    }
  }, [userAddress]);

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

  if (isLoggedIn) {
    // If the user is logged in, render the main page of the app
    return <LoginPage />;
  } else {
    // If the user is not logged in, render the login page
    return <LoginPage />;
   }
}
