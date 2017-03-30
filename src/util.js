
export const CINEMACITY_SITES = {
  'Olympia': {
    'siteId': 1010103,
    'name': 'Olympia',
  },
  'VelkySpalicek': {
    'siteId': 1010107,
    'name': 'Velký Špalíček',
  },
};

export function fetchMovies(multiplex) {
  let siteId = CINEMACITY_SITES[multiplex].siteId;
  let lang = 'en';

  return fetchData(`${location.origin}/proxy/${lang}/presentationsJSON?subSiteId=${siteId}&showExpired=false`);
}

export function fetchShowtimes(multiplex, movie) {
  return fetchMovies(multiplex)
    .then(data => data.fe.filter(m => m.fn === movie)[0]);
}

function fetchData(url) {
  return fetch(url)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json();
      } else {
        throw res;
      }
    })
    .then(data => data.sites[0])
    .catch(res => {
      console.log('fetch failed:', res);
      return;
    });
}
