import { combineReducers } from 'redux';
import { moviesReducer } from './reducers/movies';
import { peopleReducer } from './reducers/people';
import { personReducer } from './reducers/person';
import { metadataReducer } from './reducers/metadata';

const rootReducer = combineReducers({
  movies: moviesReducer,
  people: peopleReducer,
  person: personReducer,
  // shows: showsReducer
  metadata: metadataReducer
});

export default rootReducer;
