import CreateElection from "../Views/CreateElection"
import React from 'react';
import { render,screen } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") ),
  useNavigate: () => mockedUsedNavigate
}));

describe('CreateElection', () => {
  it('renders correctly', () =>  {
    render(<CreateElection/>)
    const {getByTestId, getByText} = screen(<CreateElection/>)

    const namelabel = getByText(/Name of the election/i)
    const startTimelabel = getByText(/Start time: /i)
    const endTimelabel = getByText(/End time: /i)
    const candidateslabel = getByText(/Candidates: /i)

    expect(namelabel).toBeInDocument()
    expect(startTimelabel).toBeInDocument()
    expect(endTimelabel).toBeInDocument()
    expect(candidateslabel).toBeInDocument()
    

  })
    


})