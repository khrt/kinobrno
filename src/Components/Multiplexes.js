import React from 'react';

import Multiplex from './Multiplex';

const MULTIPLEXES = ['Olympia', 'VelkySpalicek'];

export default class Multiplexes extends React.Component {
  render() {
    return (
      <div>
        <h1>Multiplexes</h1>

        <nav id="multiplexes">
          {
            MULTIPLEXES.map(name => <Multiplex key={name} name={name}/>)
          }
        </nav>

        {this.props.children}
      </div>
    );
  }
}
