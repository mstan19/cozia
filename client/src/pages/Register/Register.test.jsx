import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Register from "./Register";
import App from "../../App";
import { LoginForm } from '../../components/Login/LoginForm';
import { SignUpForm } from '../../components/SignUp/SignUpForm';

describe('toggles between sign up and login', () => {
  test("renders the login", () => {
   render(<App />);
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  })
});

// const signUpComponent = render(<SignUp />)