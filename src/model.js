
//import 'whatwg-fetch';
require('es6-promise').polyfill();
require('isomorphic-fetch');

function handleError(res) {
  console.log('fetch failed:' + res);
  return;
}

function handleResponse(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  } else {
    throw res;
  }
}

function parseCinemaCity(data) {
  let shownLocations = Array('Olympia', 'Velký Špalíček');

  for (let i of data.sites) {
    if (shownLocations.indexOf(i.sn) == -1) { continue; }

    console.log(i);
  }
}

const CINEMACITY_LOCATIONS = {
  Olympia: 1010103,
  VelkySpalicek: 1010107,
};

class Showtime {
  constructor(props) {
    this.props = {
      date: props.dt,
      time: props.tm,
      screen: props.at,

      db: props.db,
      pc: props.pc,
      vt: props.vt,
    };
  }

  date() {
    let re = new RegExp('(\\d{1,2})/(\\d{1,2})/(\\d{4}).*');
    let date = new Date(Date.parse(this.props.date.replace(re, '$2/$1/$3')));

    return date.toDateString();
  }

  time() {
    return this.props.time;
  }

  screen() {
    return this.props.screen;
  }
}

class Movie {
  constructor(props) {
    this.props = {
      title: props.fn,
      showtime: props.pr,
    };
  }

  title() {
    return this.props.title
  }

  showtime() {
    let showtime = [];
    for (let i of this.props.showtime) {
      showtime.push(new Showtime(i))
    }
    return showtime;
  }
}

class CinemaCity {
  constructor(props = {}) {
    if (  !props.hasOwnProperty('location')
        && props.location
        && CINEMACITY_LOCATIONS[props.location])
    {
      throw { code: 'NO_LOCATION' };
    }

    this.props = {
      lang: props.hasOwnProperty('lang') ? props.lang : 'en',
      location: {
        name: props.location,
        id: CINEMACITY_LOCATIONS[props.location],
      },
    };
  }

  movies(location) {
    let url = `http://www.cinemacity.cz/${this.props.lang}/presentationsJSON?subSiteId=${this.props.location.id}&showExpired=false`

    return fetch(url)
      .then(handleResponse)
      .then((data) => {
        let movies = []
        for (let i of data.sites[0].fe) {
          movies.push(new Movie(i));
        }
        return movies;
      })
      .catch(handleError);
  }
}

new CinemaCity({ location: 'Olympia' })
  .movies()
  .then(function(movies) {
    showtime = movies[0].showtime();
    console.log(showtime[0].date() + ' ' + showtime[0].time());
  })
  .catch(function(ex) {
    console.error(ex);
  });
