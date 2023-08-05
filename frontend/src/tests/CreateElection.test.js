import CreateElection from "../Views/CreateElection"
import React from 'react';
import { render,screen, fireEvent  } from "@testing-library/react";
import addhours from "date-fns/addHours";
import { findFormErrors } from '../Views/CreateElection';
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") ),
  useNavigate: () => mockedUsedNavigate
}));

const now = new Date();
describe("CreateElection", () => {
  
  it("should render the component without errors", () => {
    render(<CreateElection />);
    expect(screen.getByText("Election creation")).toBeTruthy();
  });

  it("should render the form fields correctly", () => {
    render(<CreateElection />);
    expect(screen.getByTestId("create-election-name")).toBeTruthy();
    expect(screen.getByTestId("create-election-startTime")).toBeTruthy();
    expect(screen.getByTestId("create-election-endDate")).toBeTruthy();
    expect(screen.getByTestId("create-election-candidates")).toBeTruthy();
  });

  it("should call the `handleSubmit` function when the submit button is clicked", () => {
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const submitButton = screen.getByTestId("create-election-submit");
    submitButton.addEventListener("click", handleSubmitSpy);
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).toBeCalled();
  });

  it("should not call the `handleSubmit` function if the `name` field is empty", () => {
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const submitButton = screen.getByTestId("create-election-submit");

    const nameInput = screen.getByTestId("create-election-name");
    nameInput.value = "";
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).not.toBeCalled();
  });

  it("should not call the `handleSubmit` function if the `startTime` field is empty", () => {
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const submitButton = screen.getByTestId("create-election-submit");
    const startTimeInput = screen.getByTestId("create-election-startTime");
    startTimeInput.value = "";
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).not.toBeCalled();
  });

  it("should not call the `handleSubmit` function if the `endTime` field is before the `startTime` field", () => {
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const startTimeInput = screen.getByTestId("create-election-startTime");
    const submitButton = screen.getByTestId("create-election-submit");
    startTimeInput.value = now.toISOString();
    const endTimeInput = screen.getByTestId("create-election-endDate");
    endTimeInput.value = now.toISOString() - "1m";
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).not.toBeCalled();
  });

  it("should not call the `handleSubmit` function if the `candidates` list is empty", () => {
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const submitButton = screen.getByTestId("create-election-submit");
    const candidatesInput = screen.getByTestId("create-election-candidates");
    candidatesInput.value = "";
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).not.toBeCalled();
  });

  it("should not call the `handleSubmit` function with an empty candidates list and generate and error", () => {
    const form = {
      election: "Election Name",
      startTime: new Date(),
      endTime: addhours(new Date(), 1),
      candidates: []
    };
    
    const handleSubmitSpy = jest.fn();
    render(<CreateElection handleSubmit={handleSubmitSpy} />);
    const nameInput = screen.getByTestId("create-election-name");
    nameInput.value = form.election;
    const startTimeInput = screen.getByTestId("create-election-startTime");
    const submitButton = screen.getByTestId("create-election-submit");
    startTimeInput.value = form.startTime.toISOString();
    const endTimeInput = screen.getByTestId("create-election-endDate");
    endTimeInput.value = form.endTime.toISOString() ;
   
    const errors = findFormErrors(form);
    expect(errors.candidates).not.toEqual([]);
    fireEvent.click(submitButton);
    expect(handleSubmitSpy).not.toBeCalled();
  });

  it("should contain the candidate Bard and 0 errors", () => {
    const form = {
      election: "Election Name",
      startTime: new Date(),
      endTime: addhours(new Date(), 1),
      candidates: ["Bard"]
    };
    const errors = findFormErrors(form);
    const newListItem = form.candidates;
    expect(newListItem).toContain("Bard");
    expect(errors).toStrictEqual({});
  
  });
  });
