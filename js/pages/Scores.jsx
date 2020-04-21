import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { addAScore } from '../redux/actionCreators/Scores';
import './Scores.scss';

class Teams extends React.Component {
  render() {
    return (
      <div className="Scores">
        <div>scores:</div>
        <br />
        <div>Judgin criteria:</div>
        <div className="Scores__entity">
          Idea:
          <input
            value={this.props.judge.JCIdea || ''}
            placeholder="1-10"
            type="number"
            data-score-input="JCIdea"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Completeness:
          <input
            value={this.props.judge.JCCompleteness || ''}
            placeholder="1-10"
            type="number"
            data-score-input="JCCompleteness"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Viability:
          <input
            value={this.props.judge.JCViability || ''}
            placeholder="1-10"
            type="number"
            data-score-input="JCViability"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Innovation:
          <input
            value={this.props.judge.JCInnovation || ''}
            placeholder="1-10"
            type="number"
            data-score-input="JCInnovation"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          "X" Factor:
          <input
            value={this.props.judge.JCXFactor || ''}
            placeholder="1-10"
            type="number"
            data-score-input="JCXFactor"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div>
          judging criteria total: {this.props.judge.judgingCriteriaTotalScore}
        </div>

        <br />
        <div>weighting criteria:</div>
        <div className="Scores__entity">
          Mixed Company Teams (10%):
          <input
            value={this.props.judge.WCMixedCompanyTeams || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCMixedCompanyTeams"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Mixed Project Teams (10%):
          <input
            value={this.props.judge.WCMixedProjectTeams || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCMixedProjectTeams"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Location Mix (10%):
          <input
            value={this.props.judge.WCLocationMix || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCLocationMix"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Team Size (from 3 to 8 ppl) (10%):
          <input
            value={this.props.judge.WCTeamSize || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCTeamSize"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Business Relevance (10%):
          <input
            value={this.props.judge.WCBusinessRelevance || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCBusinessRelevance"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Demo Readiness (25%):
          <input
            value={this.props.judge.WCDemoReadiness || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCDemoReadiness"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div className="Scores__entity">
          Video / Presentation Ready (25%):
          <input
            value={this.props.judge.WCVideoPresentationReady || ''}
            placeholder="0-2"
            type="number"
            data-score-input="WCVideoPresentationReady"
            onInput={this.onSetScore}
            required
          />
        </div>
        <div>
          weighting criteria total:{' '}
          {this.props.judge.weightingCriteriaTotalScore}%
        </div>

        <br />
        <div>final score: {this.props.judge.finalScore}</div>

        <br />
        <div>
          <Link to={`/${this.props.match.params.team}`}>Go back to judges</Link>
        </div>
      </div>
    );
  }

  onSetScore = e => {
    let inputValue = +e.target.value;
    const score = e.target.dataset.scoreInput;

    if (!inputValue) {
      inputValue = null;
    }

    this.props.addAScore(inputValue, score, this.props.match.params.judge);
  };
}

const mapStateToProps = (state, ownProps) => ({
  teams: state.teams,
  judge: state.judges[ownProps.match.params.judge]
});

const mapDispatchToProps = dispatch => ({
  addAScore(inputValue, score, judgeID) {
    dispatch(addAScore(inputValue, score, judgeID));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Teams)
);
