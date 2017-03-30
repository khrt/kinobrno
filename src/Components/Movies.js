import React from 'react';
import { Route, Link } from 'react-router-dom';

import Showtimes from './Showtimes';
import { fetchMovies } from '../util';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      multiplex: '',
    };
  }

  componentDidMount() {
    fetchMovies(this.props.match.params.multiplex)
      .then(data => {
        this.setState({
          movies: data.fe,
          multiplex: data.sn,
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    fetchMovies(nextProps.match.params.multiplex)
      .then(data => {
        this.setState({
          movies: data.fe,
          multiplex: data.sn,
        })
      });
  }

  render() {
    //<img src={`http://media1.cinema-city.pl/cz/Feats/med/${m.dc}.jpg`} alt={m.fn}/>
    return (
      <div>
        <h1>Movies at {this.state.multiplex}</h1>

        <ul role="navigation" id="movies">
          {
            this.state.movies.map(m => (
              <li key={m.fn}>
                <Link to={`${this.props.match.url}/${m.fn}`}>
                  {m.fn}
                </Link>
              </li>
            ))
          }
        </ul>

        <Route path={`/:multiplex/:movie`} component={Showtimes}/>
      </div>
    );
  }
}
