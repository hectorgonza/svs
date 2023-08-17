// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';



// Mocking window.ethereum for MetaMask
global.window.ethereum = {
    enable: jest.fn(),
    on: jest.fn(),
    removeAllListeners: jest.fn()
  };
  
  
  // Mocking the ethers library
  jest.mock('ethers', () => {
    return {
      providers: {
        Web3Provider: jest.fn().mockImplementation(() => {
          return {
            listAccounts: jest.fn().mockReturnValue([]) // initially no accounts
          };
        })
      }
    };
  });
  