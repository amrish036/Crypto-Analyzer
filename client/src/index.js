import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './App';
import  serviceWorker from './utils/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
