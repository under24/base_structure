import utils from '../../utils/reduxUtils';
import {
  ADD_TRAKT_PEOPLE_SUMMARY,
  ADD_TMDB_PEOPLE_DETAILS,
  ADD_TRAKT_TMDB_COMBINED_CREDITS,
  // ADD_TMDB_PEOPLE_EXTERNAL_IDS,
  ADD_TMDB_PEOPLE_TAGGED_IMAGES,
  ADD_TMDB_PEOPLE_POPULAR
} from '../actions/people';

export const peopleReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRAKT_PEOPLE_SUMMARY: {
      return {
        ...state,
        [action.metadata.slug]: action.payload
      };
    }

    case ADD_TMDB_PEOPLE_DETAILS: {
      const slug = action.metadata.slug;

      const prev = state[slug].viewData.details;
      const next = action.payload.viewData.details;

      // combine details data keys
      // prev + next into one obj
      const details = utils.combineObjects(prev, next);

      const viewData = {
        ...state[slug].viewData,
        details
      };

      const newState = {
        ...state[slug],
        viewData,
        tmdbDetails: action.payload.tmdbDetails
      };

      return { ...state, [slug]: newState };
    }

    case ADD_TRAKT_TMDB_COMBINED_CREDITS: {
      const slug = action.metadata.slug;

      const viewData = {
        ...state[slug].viewData,
        ...action.payload.viewData
      };

      const newState = {
        ...state[slug],
        viewData,
        tmdbCombinedCredits: action.payload.tmdbCombinedCredits,
        traktMovies: action.payload.traktMovies,
        traktShows: action.payload.traktShows
      };

      return { ...state, [slug]: newState };
    }

    // case ADD_TMDB_PEOPLE_EXTERNAL_IDS: {
    //   const slug = action.metadata.slug;
    //
    //   const viewData = {
    //     ...state[slug].viewData,
    //     ...action.payload.viewData
    //   };
    //
    //   const newState = {
    //     ...state[slug],
    //     viewData,
    //     tmdbExternalIds: action.payload.tmdbExternalIds
    //   };
    //
    //   return { ...state, [slug]: newState };
    // }

    case ADD_TMDB_PEOPLE_TAGGED_IMAGES: {
      const slug = action.metadata.slug;

      let viewData;
      let tmdbTaggedImages;
      // update tagged images
      // merge old data with the new one
      if (state[slug].viewData.taggedImages) {
        viewData = {
          ...state[slug].viewData,
          taggedImages: state[slug].viewData.taggedImages.concat(
            action.payload.viewData.taggedImages
          )
        };
        tmdbTaggedImages = {
          ...state[slug].tmdbTaggedImages,
          ...action.payload.tmdbTaggedImages
        };
        // add tagged images
        // brand new objects
      } else {
        viewData = {
          ...state[slug].viewData,
          taggedImages: action.payload.viewData.taggedImages
        };
        tmdbTaggedImages = action.payload.tmdbTaggedImages;
      }

      const newState = {
        ...state[slug],
        viewData,
        tmdbTaggedImages
      };

      return { ...state, [slug]: newState };
    }

    case ADD_TMDB_PEOPLE_POPULAR: {
      if (state.tmdbPopular) {
        const pages = {
          ...state.tmdbPopular.pages,
          ...action.payload.tmdbPopular.pages
        };

        const tmdbPopular = {
          ...state.tmdbPopular,
          pages
        };

        return { ...state, tmdbPopular };
      }

      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
};

export const a = 10;
