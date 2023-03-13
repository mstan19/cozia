import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartContext from "./context/CartContext";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <CartContext>
           <App /> 
        </CartContext>
        
    </React.StrictMode>
);
