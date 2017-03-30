import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Multiplexes from './Components/Multiplexes';

const App = () => (
  <Router>
    <Multiplexes/>
  </Router>
);

ReactDOM.render(<App/>, document.getElementById('app'));
