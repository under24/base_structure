import tmdb from '../../utils/tmdb';
import {
  tmdbSearchMultiFetching,
  tmdbSearchMultiFetched,
  tmdbSearchMultiWaiting,
  tmdbSearchMultiError
} from '../actionCreators/search';

let searchTimerId = 0;

export const requestSearchData = searchQuery => dispatch => {
  // set searchQuery and status ('waiting')
  dispatch(tmdbSearchMultiWaiting(searchQuery));

  // if previous timer is active (waiting for timeout to request search data)
  if (searchTimerId) {
    // kill previous timer to set up a new one
    clearTimeout(searchTimerId);
  }

  if (searchQuery.length > 2) {
    searchTimerId = setTimeout(() => {
      // clear timer state
      searchTimerId = 0;

      console.warn('request data for', searchQuery);

      // set status to 'fetching'
      dispatch(tmdbSearchMultiFetching(searchQuery));

      // request search data
      tmdb
        .searchMulti(searchQuery)
        .then(response => response.json())
        .then(response => {
          // debugger;

          dispatch(tmdbSearchMultiFetched(response, searchQuery));
        })
        .catch(error => {
          debugger;
          console.log(error);
        });
    }, 600);
  }
};

export const a = 10;
