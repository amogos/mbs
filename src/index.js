// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import FirebaseConnector from './connectors/firebase_connector'
import FacebookConnector from './connectors/facebook_connector'

ReactDom.render(<App  dbconnector = { new FirebaseConnector()} socialconnector = { new FacebookConnector() } />, document.getElementById("root"));
