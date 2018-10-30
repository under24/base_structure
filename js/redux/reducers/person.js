import { ADD_TMDB_PEOPLE_BATCHED_DATA } from '../actions/person';

export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TMDB_PEOPLE_BATCHED_DATA: {
      return {
        ...state,
        [action.metadata.tmdbId]: action.payload
      };
    }
    default:
      return state;
  }
};

export const a = 10;
