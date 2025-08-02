import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";

import { ExpensesProvider } from "./context/ExpensesContext";
import { RoommateProvider } from "./context/RoommateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    
        <ExpensesProvider>
           <RoommateProvider>
          <App />
          </RoommateProvider>
        </ExpensesProvider>
  
    </BrowserRouter>
  </React.StrictMode>
);
