import { combineReducers } from 'redux';
import { moviesReducer } from './reducers/movies';
import { peopleReducer } from './reducers/people';
import { personReducer } from './reducers/person';
import { metadataReducer } from './reducers/metadata';
import { searchReducer } from './reducers/search';

const rootReducer = combineReducers({
  movies: moviesReducer,
  people: peopleReducer,
  person: personReducer,
  // shows: showsReducer
  metadata: metadataReducer,
  search: searchReducer
});

export default rootReducer;
