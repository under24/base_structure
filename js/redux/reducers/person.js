import {
  ADD_TMDB_PEOPLE_BATCHED_DATA,
  ADD_TMDB_PEOPLE_EXTERNAL_IDS,
  ADD_TMDB_PEOPLE_IMAGES,
  ADD_TMDB_PEOPLE_COMBINED_CREDITS
} from '../actions/person';

export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TMDB_PEOPLE_BATCHED_DATA: {
      return {
        ...state,
        [action.metadata.tmdbId]: action.payload
      };
    }
    case ADD_TMDB_PEOPLE_EXTERNAL_IDS: {
      const tmdbId = action.metadata.tmdbId;

      let newPersonData;
      // id is present in state
      if (state[tmdbId]) {
        newPersonData = {
          ...state[tmdbId],
          externalIds: action.payload
        };
        // id is not present is state
      } else {
        newPersonData = {
          externalIds: action.payload
        };
      }

      return { ...state, [tmdbId]: newPersonData };
    }
    case ADD_TMDB_PEOPLE_IMAGES: {
      const tmdbId = action.metadata.tmdbId;

      let newPersonData;
      // id is present in state
      if (state[tmdbId]) {
        newPersonData = {
          ...state[tmdbId],
          images: action.payload
        };
        // id is not present in state
      } else {
        newPersonData = {
          images: action.payload
        };
      }

      return { ...state, [tmdbId]: newPersonData };
    }
    case ADD_TMDB_PEOPLE_COMBINED_CREDITS: {
      const tmdbId = action.metadata.tmdbId;

      let newPersonData;
      // id is present in state
      if (state[tmdbId]) {
        newPersonData = {
          ...state[tmdbId],
          credits: action.payload
        };
        // id is not present in state
      } else {
        newPersonData = {
          credits: action.payload
        };
      }

      return { ...state, [tmdbId]: newPersonData };
    }
    default:
      return state;
  }
};

export const a = 10;
