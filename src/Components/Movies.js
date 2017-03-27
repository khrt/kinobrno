import React from 'react';

export default class Movies extends React.Component {

  render() {
    return (
      <div>
        <nav id="movies">
          <h1>Movies at {this.props.params.multiplex}</h1>
        </nav>

        {this.props.children}
      </div>
    );
  }
}
