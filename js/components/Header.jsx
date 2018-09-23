import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setSearchTerm } from '../redux/actionCreators';

const Header = props => {
  let utilSpace;

  if (props.showSearch) {
    utilSpace = (
      <input
        onChange={props.handleSearchTermChange}
        value={props.searchTerm}
        type="text"
        placeholder="search"
      />
    );
  } else {
    utilSpace = (
      <h2>
        <Link to="/search">back</Link>
      </h2>
    );
  }

  return (
    <header>
      <h1>
        <Link to="/">svideo</Link>
      </h1>
      {utilSpace}
    </header>
  );
};

Header.defaultProps = {
  showSearch: false,
  searchTerm: '',
  handleSearchTermChange: () => {}
};

Header.propTypes = {
  showSearch: PropTypes.bool,
  searchTerm: PropTypes.string,
  handleSearchTermChange: PropTypes.func
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
)(Header);
