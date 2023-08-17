// PrivateRoute.test.js
import { render } from '@testing-library/react';
import { MemoryRouter, Route,Routes, Navigate } from 'react-router-dom';
import { useMetaMask } from '../Metamask/MetaMaskContext'; // Adjust the import path

jest.mock('../Metamask/MetaMaskContext'); // Mock the module

test('redirects to login when not connected', () => {
    useMetaMask.mockReturnValue(false); // Mock not being connected
    
    const { container } = render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={useMetaMask() ? <div>Private Content</div> : <Navigate to="/login" />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(container).toHaveTextContent('Login Page');
  });
  
  test('renders private content when connected', () => {
    useMetaMask.mockReturnValue(true); // Mock being connected
    
    const { container } = render(
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route path="/private" element={useMetaMask() ? <div>Private Content</div> : <Navigate to="/login" />} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(container).toHaveTextContent('Private Content');
  });
  