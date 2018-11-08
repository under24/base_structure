import tmdb from '../../utils/tmdb';
import { addTmdbPeoplePopular } from '../actionCreators/people';

export const requestPeopleData = page => dispatch => {
  debugger;

  tmdb
    .peopleGetPopular(page)
    .then(response => response.json())
    .then(response => {
      dispatch(addTmdbPeoplePopular(response));
    })
    .catch(error => {
      debugger;
      console.log(error);
    });
};

export const a = 10;
