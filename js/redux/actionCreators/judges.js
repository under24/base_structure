import { ADD_A_JUDGE, DELETE_A_JUDGE } from '../actions/judges';

export const addAJudge = (judgeName, teamID) => ({
  type: ADD_A_JUDGE,
  payload: {
    judgeName,
    JCIdea: null,
    JCCompleteness: null,
    JCViability: null,
    JCInnovation: null,
    JCXFactor: null,
    WCMixedCompanyTeams: null,
    WCMixedProjectTeams: null,
    WCLocationMix: null,
    WCTeamSize: null,
    WCBusinessRelevance: null,
    WCDemoReadiness: null,
    WCVideoPresentationReady: null,
    judgingCriteriaTotalScore: 0,
    weightingCriteriaTotalScore: 0,
    finalScore: 0
  },
  metadata: {
    judgeID: createID(),
    teamID
  }
});

export const deleteAJudge = (judgeID, teamID) => {
  return {
    type: DELETE_A_JUDGE,
    metadata: {
      judgeID,
      teamID
    }
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
