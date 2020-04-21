import { ADD_A_SCORE } from '../actions/scores';

export const addAScore = (inputValue, score, judgeID) => ({
  type: ADD_A_SCORE,
  payload: {
    [score]: inputValue
  },
  metadata: {
    judgeID
  }
});
