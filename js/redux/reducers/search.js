import {
  TMDB_SEARCH_MULTI_FETCHING,
  TMDB_SEARCH_MULTI_FETCHED,
  TMDB_SEARCH_MULTI_WAITING,
  TMDB_SEARCH_MULTI_ERROR
} from '../actions/search';

const initState = {
  page: undefined,
  results: [],
  totalPages: undefined,
  totalResults: undefined,
  status: undefined,
  searchQuery: ''
};

export const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case TMDB_SEARCH_MULTI_FETCHING: {
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MULTI_FETCHED: {
      const searchQuery = action.payload.searchQuery;

      // wrong data response
      if (searchQuery !== state.searchQuery) {
        // do nothing
        return state;
      }

      // correct data response
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MULTI_WAITING: {
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MULTI_ERROR: {
      debugger;
      return state;
    }
    default:
      return state;
  }
};

export const a = 10;
