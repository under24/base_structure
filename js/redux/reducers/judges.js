import LSU from '../../utils/LocalStorageUtils';
import { ADD_A_JUDGE, DELETE_A_JUDGE } from '../actions/judges';
import { ADD_A_SCORE } from '../actions/scores';

let initState = {};

const localState = LSU.get('judges');
if (localState) {
  initState = { ...initState, ...JSON.parse(localState) };
}

export const judgesReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_A_JUDGE: {
      const newState = { ...state, [action.metadata.judgeID]: action.payload };

      LSU.remove('judges');
      LSU.save('judges', newState);

      return newState;
    }
    case DELETE_A_JUDGE: {
      delete state[action.metadata.judgeID];

      const newState = { ...state };

      LSU.remove('judges');
      LSU.save('judges', newState);

      return newState;
    }
    case ADD_A_SCORE: {
      let newJudge = {
        ...state[action.metadata.judgeID],
        ...action.payload
      };

      const judgingCriteriaTotalScore =
        (newJudge.JCIdea || 0) +
        (newJudge.JCCompleteness || 0) +
        (newJudge.JCViability || 0) +
        (newJudge.JCInnovation || 0) +
        (newJudge.JCXFactor || 0);
      debugger;
      const weightingCriteriaTotalScore =
        (newJudge.WCMixedCompanyTeams || 0) * 10 +
        (newJudge.WCMixedProjectTeams || 0) * 10 +
        (newJudge.WCLocationMix || 0) * 10 +
        (newJudge.WCTeamSize || 0) * 10 +
        (newJudge.WCBusinessRelevance || 0) * 10 +
        (newJudge.WCDemoReadiness || 0) * 25 +
        (newJudge.WCVideoPresentationReady || 0) * 25;

      const finalScore =
        judgingCriteriaTotalScore +
        (weightingCriteriaTotalScore * judgingCriteriaTotalScore) / 100;

      newJudge = {
        ...newJudge,
        ...{
          judgingCriteriaTotalScore,
          weightingCriteriaTotalScore,
          finalScore
        }
      };

      const newState = {
        ...state,
        [action.metadata.judgeID]: newJudge
      };

      LSU.remove('judges');
      LSU.save('judges', newState);

      return newState;
    }
    default:
      return state;
  }
};
