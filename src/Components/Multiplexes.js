import React from 'react';

export default class Multiplexes extends React.Component {

  render() {
    return (
      <div>
        <nav id="multiplexes">
          <h1>Multiplexes</h1>
        </nav>

        {this.props.children}
      </div>
    );
  }
}
