import React from 'react';

export default class Multiplex extends React.Component {
  render() {
    return (
      <div>
        <a href={`/${this.props.name}`}>{this.props.name}</a>
      </div>
    )
  }
}
