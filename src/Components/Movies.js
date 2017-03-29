import React from 'react';

import CinemaCity from '../model.js';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    new CinemaCity({ location: this.props.params.multiplex })
      .movies()
      .then(data => {
        this.setState({ movies: data })
      });
  }

  render() {
    return (
      <div>
        <h1>Movies at {this.props.params.multiplex}</h1>

        <nav id="movies">
          {
            this.state.movies.map(x => <div key={ x.title() }>{ x.title() }</div>)
          }
        </nav>

        {this.props.children}
      </div>
    );
  }
}
