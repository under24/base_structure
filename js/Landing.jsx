import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchTerm } from './redux/actionCreators';

class Landing extends Component {
  goToSearch = event => {
    event.preventDefault();
    this.props.history.push('/search');
  };

  render() {
    return (
      <div className="landing">
        <h1>svideo</h1>
        <form onSubmit={this.goToSearch}>
          <input
            value={this.props.searchTerm}
            type="text"
            placeholder="Search"
            onChange={this.props.handleSearchTermChange}
          />
        </form>

        <Link to="/search">or Browse All</Link>
      </div>
    );
  }
}

Landing.defaultProps = {
  searchTerm: '',
  handleSearchTermChange: () => {},
  history: {
    push: () => {}
  }
};

Landing.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchTermChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

const mapDispatchToProps = dispatch => ({
  handleSearchTermChange(event) {
    dispatch(setSearchTerm(event.target.value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
