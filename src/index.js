import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import './styles/App.css';
import './styles/reset.css';
import App from './components/Main';

// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Router />, document.getElementById('app'));
