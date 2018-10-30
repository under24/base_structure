import trakt from '../../utils/trakt';
import tmdb from '../../utils/tmdb';

import {
  addTraktPeopleSummary,
  addTmdbPeopleDetails,
  addTraktTmdbCombinedCredits,
  AddTmdbPeopleExternalIds,
  addTmdbPeopleTaggedImages,
  addTmdbPeoplePopular
} from '../actionCreators/people';

export function requestPersonData(slug) {
  return dispatch => {
    trakt
      .getPeopleSummary(slug, true)
      .then(response => response.json())
      .then(response => {
        dispatch(addTraktPeopleSummary(response));
        return response.ids.tmdb;
      })
      .then(tmdbId => {
        tmdb
          .peopleGetDetails(tmdbId)
          .then(response => response.json())
          .then(response => dispatch(addTmdbPeopleDetails(slug, response)))
          .catch(error => {
            debugger;
            console.log(error);
          });

        tmdb
          .peopleGetExternalIDs(tmdbId)
          .then(response => response.json())
          .then(response => dispatch(AddTmdbPeopleExternalIds(slug, response)))
          .catch(error => {
            debugger;
            console.log(error);
          });

        tmdb
          .peopleGetTaggedImages(tmdbId)
          .then(response => response.json())
          .then(response => dispatch(addTmdbPeopleTaggedImages(slug, response)))
          .catch(error => {
            debugger;
            console.log(error);
          });

        const creditData = [
          () => trakt.getPeopleMovies(slug),
          () => trakt.getPeopleShows(slug),
          () => tmdb.peopleGetCombinedCredits(tmdbId)
        ];
        Promise.all(creditData.map(fn => fn()))
          .then(response => Promise.all(response.map(r => r.json())))
          .then(response => ({
            traktMovies: response[0],
            traktShows: response[1],
            tmdbCombinedCredits: response[2]
          }))
          .then(response =>
            dispatch(addTraktTmdbCombinedCredits(slug, response))
          )
          .catch(error => {
            debugger;
            console.log(error);
          });

        tmdb
          .peopleGetPopular()
          .then(response => response.json())
          .then(response => dispatch(addTmdbPeoplePopular(response)))
          .catch(error => {
            debugger;
            console.log(error);
          });

        tmdb
          .peopleGetPopular(2)
          .then(response => response.json())
          .then(response => dispatch(addTmdbPeoplePopular(response)))
          .catch(error => {
            debugger;
            console.log(error);
          });
      })
      .catch(error => {
        debugger;
        console.log(error);
      });

    // refactoring
    debugger;
    tmdb
      .peopleGetDetails(tmdbId)
      .then(response => response.json())
      .then(response => {
        debugger;
      });
  };
}

export const a = 10;
