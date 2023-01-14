import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.js";

// imports style
import logo from './logo.svg';
import './App.css';

import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './global';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div>
          <h1>Hello. This is burger menu tutorial</h1>
          <img src="https://image.flaticon.com/icons/svg/2016/2016012.svg" alt="burger icon" />
          <small>Icon made by Freepik from www.flaticon.com</small>
        </div>
      </>
    </ThemeProvider>
  );
}
export default App;
