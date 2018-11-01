import tmdb from '../../utils/tmdb';
import {
  addTmdbPeopleBatchedData,
  addTmdbPeopleExternalIds,
  addTmdbPeopleImages,
  addTmdbPeopleCombinedCredits
} from '../actionCreators/person';

export const requestPersonData = tmdbId => dispatch => {
  tmdb
    .peopleGetBatchData(tmdbId)
    .then(response => response.json())
    // ensure that there are no error in the response
    .then(response => {
      // error. throw error
      if (response.status_message) {
        throw new Error(response.status_message);
      }
      // success. pass response further
      return response;
    })
    .then(response => {
      const mappedData = {
        details: {
          adult: response.adult,
          also_known_as: response.also_known_as,
          biography: response.biography,
          birthday: response.birthday,
          deathday: response.deathday,
          gender: response.gender,
          homepage: response.homepage,
          id: response.id,
          imdb_id: response.imdb_id,
          known_for_department: response.known_for_department,
          name: response.name,
          place_of_birth: response.place_of_birth,
          popularity: response.popularity,
          profile_path: response.profile_path
        },
        // combinedCredits: response.combined_credits,
        // externalIds: response.external_ids,
        // images: response.images,
        taggedImages: response.tagged_images
      };

      dispatch(addTmdbPeopleBatchedData(mappedData));
      dispatch(addTmdbPeopleImages(response.id, response.images));
      dispatch(addTmdbPeopleExternalIds(response.id, response.external_ids));
      dispatch(
        addTmdbPeopleCombinedCredits(response.id, response.combined_credits)
      );
    })
    .catch(error => {
      debugger;
      console.log(error);
    });
};

export const a = 10;
