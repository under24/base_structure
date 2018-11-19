import {
  TMDB_SEARCH_MUTLI_FETCHING,
  TMDB_SEARCH_MUTLI_FETCHED,
  TMDB_SEARCH_MUTLI_WAITING,
  TMDB_SEARCH_MUTLI_ERROR
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
    case TMDB_SEARCH_MUTLI_FETCHING: {
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MUTLI_FETCHED: {
      const searchQuery = action.payload.searchQuery;

      // wrong data response
      if (searchQuery !== state.searchQuery) {
        // do nothing
        return state;
      }

      // correct data response
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MUTLI_WAITING: {
      return { ...state, ...action.payload };
    }
    case TMDB_SEARCH_MUTLI_ERROR: {
      debugger;
      return state;
    }
    default:
      return state;
  }
};

export const a = 10;
