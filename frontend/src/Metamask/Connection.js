
import React, { Component } from 'react';
import {Button, Alert, Container} from "react-bootstrap" 
import { ethers } from "ethers";

class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async connectToMetamask() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    this.setState({ selectedAddress: accounts[0] })
  }

  renderMetamask() {
    if (!this.state.selectedAddress) {
      return (
        <Button  onClick={() => this.connectToMetamask()}>Connect to Metamask</Button>
      )
    } else {
      return (
        <Alert varaiant="dark" key="dark">Welcome {this.state.selectedAddress}</Alert>
      );
    }
  }

  render() {
    return(
      <Container  classname="p-4  ">
        {this.renderMetamask()}
      </Container>
    )
  }
}

export default Metamask;