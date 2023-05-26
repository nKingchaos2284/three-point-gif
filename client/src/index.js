import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import ApolloClient from './ApolloClient';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
