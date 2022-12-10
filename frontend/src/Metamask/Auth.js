import  { Component } from 'react';
import { ethers } from 'ethers';

class Auth extends Component {
  constructor(props) {
    super(props);

    // Initialize the state variables to store the user's Ethereum address and login status
    this.state = {
      userAddress: null,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    // Connect to Metamask when the component mounts
    async function connectToMetamask() {
      // Create a provider to connect to Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request access to the user's Ethereum accounts
      await window.ethereum.enable();

      // Get the user's Ethereum address
      const [address] = await provider.listAccounts();

      // Save the user's Ethereum address to state
      this.setState({ userAddress: address });
    }
    connectToMetamask();
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the user is logged in every 5 seconds
    if (prevState.userAddress !== this.state.userAddress) {
      if (this.state.userAddress) {
        // If the user's Ethereum address is saved to state,
        // set the login status to true
        this.setState({ isLoggedIn: true });
      } else {
        // If the user's Ethereum address is not saved to state,
        // set the login status to false
        this.setState({ isLoggedIn: false });
      }
    }

    // Save the login status to local storage when it changes
    if (prevState.isLoggedIn !== this.state.isLoggedIn) {
      if (this.state.isLoggedIn) {
        // If the user is logged in, save a login token to local storage
        localStorage.setItem('loginToken', 'userIsLoggedIn');
      } else {
        // If the user is not logged in, remove the login token from local storage
        localStorage.removeItem('loginToken');
      }
    }
  }

  // ...
}

export default Auth;
