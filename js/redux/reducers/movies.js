import { ADD_MOVIE_SUMMARY } from '../actions/movies';

export const moviesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MOVIE_SUMMARY:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export const a = 10;
