import LSU from '../../utils/LocalStorageUtils';
import { ADD_A_TEAM, DELETE_A_TEAM } from '../actions/Teams';
import { ADD_A_JUDGE, DELETE_A_JUDGE } from '../actions/Judges';

let initState = {};

const localState = LSU.get('teams');
if (localState) {
  initState = { ...initState, ...JSON.parse(localState) };
}

export const teamsReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_A_TEAM: {
      const newState = { ...state, [action.metadata.id]: action.payload };

      LSU.remove('teams');
      LSU.save('teams', newState);

      return newState;
    }
    case DELETE_A_TEAM: {
      delete state[action.metadata];

      const newState = { ...state };

      LSU.remove('teams');
      LSU.save('teams', newState);

      return newState;
    }
    case ADD_A_JUDGE: {
      const currentTeam = state[action.metadata.teamID];
      currentTeam.judges = [...currentTeam.judges, action.metadata.judgeID];

      const newState = { ...state };

      LSU.remove('teams');
      LSU.save('teams', newState);

      return newState;
    }
    case DELETE_A_JUDGE: {
      const currentTeam = state[action.metadata.teamID];

      currentTeam.judges = currentTeam.judges.filter(
        judge => judge !== action.metadata.judgeID
      );

      const newState = { ...state };

      LSU.remove('teams');
      LSU.save('teams', newState);

      return newState;
    }
    default:
      return state;
  }
};
