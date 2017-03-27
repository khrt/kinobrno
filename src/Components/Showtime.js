import React from 'react';

export default class Showtime extends React.Component {

  render() {
    return (
      <div>
        <h1>Showtime for {this.props.params.movie} at {this.props.params.multiplex}</h1>
      </div>
    );
  }
}
