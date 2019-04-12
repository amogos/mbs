// src/index.js
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import FirebaseConnector from './connectors/firebase_connector'
import FacebookConnector from './connectors/facebook_connector'

var databaseConnector = new FirebaseConnector();
var socialConnector = new FacebookConnector();

ReactDom.render(<App dbconnector={databaseConnector}
    socialconnector={socialConnector}
/>, document.getElementById("root"));
