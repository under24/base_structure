import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addAJudge, deleteAJudge } from '../redux/actionCreators/Judges';

class Judges extends React.Component {
  state = {
    newJudge: ''
  };

  render() {
    const teamID = this.props.match.params.team;

    if (!this.props.team) {
      return <div>team not found</div>;
    }

    return (
      <div className="Judges">
        <div>create a new judge:</div>
        <form onSubmit={this.onAddAJudge}>
          <input value={this.state.newJudge} onInput={this.setJudgeName} />
        </form>

        <br />

        <div>list of judges here:</div>
        {this.props.team.judges.map(judgeID => (
          <div>
            <Link to={`/${teamID}/${judgeID}`}>
              {this.props.judges[judgeID].judgeName} -{' '}
              {this.props.judges[judgeID].finalScore}
            </Link>
            <button onClick={this.onDeleteAJudge.bind(this, judgeID)}>
              delete
            </button>
          </div>
        ))}
        <br />
        <div>
          <Link to="/">Go back to teams</Link>
        </div>
      </div>
    );
  }

  onDeleteAJudge = judgeID => {
    this.props.deleteAJudge(judgeID, this.props.match.params.team);
  };

  onAddAJudge = e => {
    this.props.addAJudge(this.state.newJudge, this.props.match.params.team);

    e.preventDefault();

    this.setState({
      newJudge: ''
    });
  };

  setJudgeName = e => {
    this.setState({
      newJudge: e.target.value
    });
  };
}

const mapStateToProps = (state, ownProps) => ({
  team: state.teams[ownProps.match.params.team],
  judges: state.judges
});

const mapDispatchToProps = dispatch => ({
  addAJudge(judgeName, teamID) {
    dispatch(addAJudge(judgeName, teamID));
  },
  deleteAJudge(judgeID, teamID) {
    dispatch(deleteAJudge(judgeID, teamID));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Judges)
);
