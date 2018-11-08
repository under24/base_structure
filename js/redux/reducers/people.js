import { ADD_TMDB_PEOPLE_POPULAR } from '../actions/people';

export const peopleReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TMDB_PEOPLE_POPULAR: {
      let newState;

      // state had 'pages' prop. need to merge
      if (state.pages) {
        const pages = {
          ...state.pages,
          ...action.payload.pages
        };

        newState = {
          ...action.payload,
          pages
        };
        // no 'pages' prop in state
      } else {
        newState = {
          ...action.payload
        };
      }

      return { ...state, ...newState };
    }
    default:
      return state;
  }
};

export const a = 10;
