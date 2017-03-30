import React from 'react';
import { Route, Link } from 'react-router-dom';

import Movies from './Movies';
import { CINEMACITY_SITES } from '../util';

const Multiplex = (props) => (
  <li>
    <Link to={`/${props.lnk}`}>
      <img src={`/multiplexes/${props.name}.png`} alt={props.name}/>
    </Link>
  </li>
);

export default class Multiplexes extends React.Component {
  render() {
    return (
      <div>
        <h1>Multiplexes</h1>

        <ul role="navigation" id="multiplexes">
          {
            Object.keys(CINEMACITY_SITES).map(
              key => <Multiplex key={key} lnk={key} name={CINEMACITY_SITES[key].name}/>
            )
          }
        </ul>

        <Route path={`/:multiplex`} component={Movies}/>
      </div>
    );
  }
}
