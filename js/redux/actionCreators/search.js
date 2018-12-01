import utils from '../../utils/actionCreatorsUtils';
import {
  TMDB_SEARCH_MULTI_FETCHING,
  TMDB_SEARCH_MULTI_FETCHED,
  TMDB_SEARCH_MULTI_WAITING,
  TMDB_SEARCH_MULTI_ERROR
} from '../actions/search';

export const tmdbSearchMultiWaiting = searchQuery => ({
  type: TMDB_SEARCH_MULTI_WAITING,
  payload: {
    searchQuery,
    status: 'waiting'
  }
});

export const tmdbSearchMultiFetching = searchQuery => ({
  type: TMDB_SEARCH_MULTI_FETCHING,
  payload: {
    searchQuery,
    status: 'fetching'
  }
});

export const tmdbSearchMultiFetched = (data, searchQuery) => ({
  type: TMDB_SEARCH_MULTI_FETCHED,
  payload: {
    page: data.page,
    results: data.results.map(utils.formatSearchMultiObject.bind(utils)),
    totalPages: data.total_pages,
    totalResults: data.total_results,
    status: 'fetched',
    searchQuery
  }
});

export const tmdbSearchMultiError = (data, searchQuery) => {
  debugger;
};
