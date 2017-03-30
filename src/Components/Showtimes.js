import React from 'react';
import moment from 'moment';

import { fetchShowtimes } from '../util';

function groupShowtimesByDate(showtimes) {
  let groupedShowtimes = new Map([]);

  for (let st of showtimes) {
    const showtime = moment(`${st.dt} ${st.tm}`, 'DD/MM/YYYY dddd HH:mm');

    // If movie has started before NOW+15m then skip it
    if (showtime.isBefore(moment().add(15, 'm'))) {
      continue;
    }

    const t = showtime.calendar(null, {
      lastWeek: '[Last] dddd',
      lastDay:  '[Yesterday]',
      sameDay:  '[Today]',
      nextDay:  '[Tomorrow]',
      nextWeek: 'dddd, D MMM',
      sameElse: 'DD/MM/YYYY',
    });

    if (groupedShowtimes.has(t)) {
      groupedShowtimes.get(t).push(showtime);
    } else {
      groupedShowtimes.set(t, [showtime]);
    }
  }

  return groupedShowtimes;
}

const TimeRow = (props) => (
  <span>{props.time.format('LT')}&nbsp;</span>
);

export default class Showtimes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: '',
      showtimes: new Map([]),
    };
  }

  componentDidMount() {
    fetchShowtimes(this.props.match.params.multiplex, this.props.match.params.movie)
      .then(data => {
        this.setState({
          movie: data.fn,
          showtimes: groupShowtimesByDate(data.pr),
        });
      });
  }


  componentWillReceiveProps(nextProps) {

    fetchShowtimes(nextProps.match.params.multiplex, nextProps.match.params.movie)
      .then(data => {
        this.setState({
          movie: data.fn,
          showtimes: groupShowtimesByDate(data.pr),
        });
      });
  }

  render() {
    let showtimes = this.state.showtimes;
    let rows = [];
    for (let [when, time] of showtimes.entries()) {
      rows.push(
        <tr key={when}>
          <td>{when}</td>
          <td>
            {time.map(t => <TimeRow key={t} time={t}/>)}
          </td>
        </tr>
      )
    }

    return (
      <div>
        <h1>Showtimes for {this.state.movie}</h1>

        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
