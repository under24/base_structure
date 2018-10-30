import utils from '../../utils/actionCreatorsUtils';
import {
  ADD_TRAKT_PEOPLE_SUMMARY,
  ADD_TMDB_PEOPLE_DETAILS,
  ADD_TRAKT_TMDB_COMBINED_CREDITS,
  ADD_TMDB_PEOPLE_EXTERNAL_IDS,
  ADD_TMDB_PEOPLE_TAGGED_IMAGES,
  ADD_TMDB_PEOPLE_POPULAR
} from '../actions/people';

// trakt people summary
export const addTraktPeopleSummary = response => {
  let birthday = null;
  let age = null;

  // if birthday date is present then transform it
  if (response.birthday) {
    ({ birthday, age } = utils.normalizeDates(response.birthday));
  }

  return {
    type: ADD_TRAKT_PEOPLE_SUMMARY,
    payload: {
      traktSummary: response,
      viewData: {
        details: {
          name: response.name,
          biography: response.biography,
          birthday,
          age,
          deathday: response.death,
          birthplace: response.birthplace,
          homepage: response.homepage
        }
      }
    },
    metadata: { slug: response.ids.slug }
  };
};

// tmdb people details
export const addTmdbPeopleDetails = (slug, response) => {
  let birthday = null;
  let age = null;
  // if birthday date is present then transform it
  if (response.birthday) {
    ({ birthday, age } = utils.normalizeDates(response.birthday));
  }

  let profileImage = null;
  if (response.profile_path) {
    profileImage = `https://image.tmdb.org/t/p/w300${response.profile_path}`;
  }

  return {
    type: ADD_TMDB_PEOPLE_DETAILS,
    payload: {
      tmdbDetails: response,
      viewData: {
        details: {
          name: response.name,
          biography: response.biography,
          birthday,
          age,
          deathday: response.deathday,
          birthplace: response.place_of_birth,
          homepage: response.homepage,
          profileImage
        }
      }
    },
    metadata: { slug }
  };
};

// movies, shows credits
// [trakt movie credits, trakt show credits, tvdb combined credits]
export const addTraktTmdbCombinedCredits = (slug, response) => {
  const { traktShows, traktMovies, tmdbCombinedCredits } = response;

  const tmdbCombinedCreditsCast = tmdbCombinedCredits.cast.slice();

  let cast = [];

  traktMovies.cast.forEach(item => {
    const tmdbId = item.movie.ids.tmdb;

    for (let i = 0; i < tmdbCombinedCreditsCast.length; i += 1) {
      // if ids match
      if (tmdbId === tmdbCombinedCreditsCast[i].id) {
        // remove entity from tmdb cast array
        const splicedItem = tmdbCombinedCreditsCast.splice(i, 1);
        // add trakt slug
        splicedItem[0].slug = item.movie.ids.slug;
        splicedItem[0].year = item.movie.year;
        // add to result array
        cast = cast.concat(splicedItem);
        break;
      }
    }
  });

  traktShows.cast.forEach(item => {
    const tmdbId = item.show.ids.tmdb;

    for (let i = 0; i < tmdbCombinedCreditsCast.length; i += 1) {
      // if ids match
      if (tmdbId === tmdbCombinedCreditsCast[i].id) {
        // remove entity from tmdb cast array
        const splicedItem = tmdbCombinedCreditsCast.splice(i, 1);
        // add trakt slug
        splicedItem[0].slug = item.show.ids.slug;
        splicedItem[0].year = item.show.year;
        // add to result array
        cast = cast.concat(splicedItem);
        break;
      }
    }
  });

  return {
    type: ADD_TRAKT_TMDB_COMBINED_CREDITS,
    payload: {
      traktShows,
      traktMovies,
      tmdbCombinedCredits,
      viewData: {
        credits: { cast }
      }
    },
    metadata: { slug }
  };
};

export const AddTmdbPeopleExternalIds = (slug, response) => {
  const externalIds = {};

  if (response.imdb_id) {
    externalIds.imdb = `https://www.imdb.com/name/${response.imdb_id}/`;
  }

  if (response.twitter_id) {
    externalIds.twitter = `https://twitter.com/${response.twitter_id}/`;
  }

  if (response.instagram_id) {
    externalIds.instagram = `https://www.instagram.com/${
      response.instagram_id
    }/`;
  }

  if (response.facebook_id) {
    externalIds.facebook = `https://www.facebook.com/${response.facebook_id}/`;
  }

  return {
    type: ADD_TMDB_PEOPLE_EXTERNAL_IDS,
    payload: {
      tmdbExternalIds: response,
      viewData: { externalIds }
    },
    metadata: { slug }
  };
};

export const addTmdbPeopleTaggedImages = (slug, response) => ({
  type: ADD_TMDB_PEOPLE_TAGGED_IMAGES,
  payload: {
    tmdbTaggedImages: {
      totalPages: response.total_pages,
      totaResults: response.total_results,
      [`page${response.page}`]: response.results
    },
    viewData: {
      taggedImages: response.results
    }
  },
  metadata: { slug }
});

export const addTmdbPeoplePopular = response => {
  const formattedPageData = response.results.map(person => ({
    adult: person.adult,
    id: person.id,
    link: utils.generateLink('people', person.id, person.name),
    name: person.name,
    popularity: person.popularity,
    image: person.profile_path,
    knownFor: person.known_for.map(utils.formatMediaObject.bind(utils))
  }));

  return {
    type: ADD_TMDB_PEOPLE_POPULAR,
    payload: {
      tmdbPopular: {
        pages: {
          [response.page]: formattedPageData
        },
        totalPages: response.total_pages,
        totalResults: response.total_results
      }
    }
  };
};
