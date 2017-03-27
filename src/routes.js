import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';

import Multiplexes from './Components/Multiplexes';
import Movies from './Components/Movies';
import Showtime from './Components/Showtime';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Multiplexes}>
          <Route path=":multiplex" component={Movies}>
            <Route path=":movie" component={Showtime} />
          </Route>
        </Route>
      </Router>
    )
  }
}
