// LoginPage.test.js
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../Metamask/LoginPage';
import { useMetaMask } from '../Metamask/MetaMaskContext'; 

jest.mock('../Metamask/MetaMaskContext'); 
jest.mock('ethers', () => {
    return {
        ...jest.requireActual('ethers'),
        providers: {
            Web3Provider: jest.fn().mockImplementation((provider) => {
                return {
                    getSigner: jest.fn(),
                };
            }),
        },
    };
});


beforeEach(() => {
    window.ethereum = {
        enable: jest.fn(),
        request: jest.fn()
    };
});

test('renders login button when not connected', () => {
  useMetaMask.mockReturnValue(false); // Mock not being connected

  render(<LoginPage />, { wrapper: MemoryRouter });
  const button = screen.getByText(/Login with MetaMask/i);
  expect(button).toBeInTheDocument();
});

test('calls MetaMask enable when login button is clicked', async () => {
    render(<LoginPage />, { wrapper: MemoryRouter });
    const button = screen.getByText(/Login with MetaMask/i);
    fireEvent.click(button);
  
    // Wait for any promises to resolve
    await waitFor(() => expect(window.ethereum.enable).toHaveBeenCalled());
  });
  

test('redirects to home when already connected', () => {
  useMetaMask.mockReturnValue(true); // Mock being connected

   render(
    <MemoryRouter initialEntries={['/login']}>
      <LoginPage />
    </MemoryRouter>
  );

  // Check for redirection, e.g., by asserting that the login button is not in the document
  const button = screen.queryByText(/Login with MetaMask/i);
  expect(button).not.toBeInTheDocument();
});
