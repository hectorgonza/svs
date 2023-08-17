import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const MetaMaskContext = createContext();

export function useMetaMask() {
  return useContext(MetaMaskContext);
}

export function MetaMaskProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkMetaMaskConnection() {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();

        setIsLoggedIn(accounts.length > 0);

        // Listen for account changes
        window.ethereum.on('accountsChanged', async (accounts) => {
          setIsLoggedIn(accounts.length > 0);
        });
      }
    }

    checkMetaMaskConnection();

    // Cleanup the event listener when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  return (
    <MetaMaskContext.Provider value={isLoggedIn}>
      {children}
    </MetaMaskContext.Provider>
  );
}
