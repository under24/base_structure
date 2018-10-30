import { addMovieSummary } from '../actionCreators/movies';

const getApiKey = () =>
  '76f8823d241c75b03cb34d0225436a5c64db4cd285a292056cbb512151d5b928';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'trakt-api-version': '2',
  'trakt-api-key': getApiKey()
});

export function requestMovieSlugData(slug) {
  return dispatch => {
    debugger;

    const params = {
      method: 'GET',
      headers: new Headers(getHeaders()),
      mode: 'cors',
      cache: 'default'
    };

    const urls = [
      `https://api.trakt.tv/movies/${slug}?extended=full`,
      `https://api.trakt.tv/movies/${slug}/translations/ru`
    ];

    Promise.all(urls.map(url => fetch(url, params)))
      .then(response => Promise.all(response.map(r => r.json())))
      .then(result => [result[0], result[1][0]])
      .then(result => {
        debugger;
        dispatch(addMovieSummary(slug, result));
      })
      .catch(console.error);
  };
}

export const a = 10;
