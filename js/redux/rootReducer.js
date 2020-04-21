import { combineReducers } from 'redux';
import { teamsReducer } from './reducers/teams';
import { judgesReducer } from './reducers/judges';

const rootReducer = combineReducers({
  teams: teamsReducer,
  judges: judgesReducer
});

export default rootReducer;
