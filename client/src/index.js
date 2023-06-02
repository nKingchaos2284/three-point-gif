import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./App.css"
import "./index.css"

// renders App via apollo
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
