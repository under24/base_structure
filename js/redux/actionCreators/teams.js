import { ADD_A_TEAM, DELETE_A_TEAM } from '../actions/teams';

export const addATeam = teamName => ({
  type: ADD_A_TEAM,
  payload: {
    teamName,
    judges: [],
    judgingCriteria: {},
    weightingCriteria: {}
  },
  metadata: {
    id: createID()
  }
});

export const deleteATeam = id => {
  return {
    type: DELETE_A_TEAM,
    metadata: id
  };
};

function createID() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
