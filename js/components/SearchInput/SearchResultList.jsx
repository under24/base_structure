import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchResultItem from './SearchResultItem';
import './SearchResultList.scss';

class SearchResultList extends Component {
  getShowAll() {
    let showAll = null;

    if (this.props.results.length > 6) {
      showAll = (
        <div className="SearchResultList__show-all">
          <Link to={`/search?query=${this.props.searchQuery}`}>
            Показать остальные<sup>{this.props.totalResults - 6}</sup>
          </Link>
        </div>
      );
    }

    return showAll;
  }

  render() {
    // do not render anything
    if (
      this.props.searchQuery.length < 3 ||
      this.props.inputFocused === false ||
      this.props.status !== 'fetched'
    ) {
      return null;
    }

    return (
      <div className="SearchResultList">
        {this.props.results
          .filter((item, index) => index < 6)
          .map(item => <SearchResultItem key={item.id} {...item} />)}
        {this.getShowAll()}
      </div>
    );
  }
}

SearchResultList.defaultProps = {
  results: [],
  searchQuery: '',
  status: '',
  inputFocused: false,
  totalResults: 0
};

SearchResultList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({})),
  searchQuery: PropTypes.string,
  status: PropTypes.string,
  inputFocused: PropTypes.bool,
  totalResults: PropTypes.number
};

const mapStateToProps = state => ({
  results: state.search.results,
  searchQuery: state.search.searchQuery,
  status: state.search.status,
  totalResults: state.search.totalResults
});

export default connect(mapStateToProps)(SearchResultList);
