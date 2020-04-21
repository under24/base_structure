import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addATeam, deleteATeam } from '../redux/actionCreators/Teams';

class Teams extends React.Component {
  state = {
    newTeam: ''
  };

  render() {
    return (
      <div className="Teams">
        <div>create a new team:</div>
        <form onSubmit={this.onAddATeam}>
          <input value={this.state.newTeam} onInput={this.setTeamName} />
        </form>

        <br />

        <div>list of teams:</div>
        {Object.keys(this.props.teams)
          .sort(
            (a, b) =>
              this.getTeamSumOfFinalScores(b) - this.getTeamSumOfFinalScores(a)
          )
          .map(teamID => {
            const sumOfFinalScores = this.getTeamSumOfFinalScores(teamID);
            return (
              <div>
                <Link to={`/${teamID}`}>
                  {this.props.teams[teamID].teamName}
                </Link>{' '}
                - {sumOfFinalScores}
                <button onClick={this.onDeleteATeam.bind(this, teamID)}>
                  delete
                </button>
              </div>
            );
          })}
      </div>
    );
  }

  onDeleteATeam = teamID => {
    this.props.deleteATeam(teamID);
  };

  onAddATeam = e => {
    this.props.addATeam(this.state.newTeam);

    e.preventDefault();

    this.setState({
      newTeam: ''
    });
  };

  setTeamName = e => {
    this.setState({
      newTeam: e.target.value
    });
  };

  getTeamSumOfFinalScores = teamID => {
    return this.props.teams[teamID].judges.reduce(
      (product, current) => product + this.props.judges[current].finalScore,
      0
    );
  };
}

const mapStateToProps = state => ({
  teams: state.teams,
  judges: state.judges
});

const mapDispatchToProps = dispatch => ({
  addATeam(teamName) {
    dispatch(addATeam(teamName));
  },
  deleteATeam(teamID) {
    dispatch(deleteATeam(teamID));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
