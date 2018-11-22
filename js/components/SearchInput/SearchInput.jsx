import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import reactUtils from '../../utils/reactUtils';
import { requestSearchData } from '../../redux/thunks/search';
import SearchResultList from './SearchResultList';
import './SearchInput.scss';

class SearchInput extends Component {
  state = {
    inputFocused: false
  };

  getOverlay() {
    let overlay = '';

    if (this.state.inputFocused) {
      overlay = (
        <div
          className="SearchInput__overlay"
          onClick={this.handleOverlayClick}
          role="button"
          tabIndex="-1"
        />
      );
    }

    return overlay;
  }

  handleSearchInput = e => this.props.requestSearchData(e.target.value);

  handleSearchFocus = () => this.setState({ inputFocused: true });

  handleOverlayClick = () => this.setState({ inputFocused: false });

  resetSearchQuery = () => this.props.requestSearchData('');

  redirectToSearchPage = event => {
    event.preventDefault();
    this.props.history.push(`/search/${this.props.searchQuery}`);
  };

  render() {
    return (
      <div
        className={`SearchInput 
                    ${this.state.inputFocused ? 'SearchInput--focused' : ''}
                    ${this.props.loading ? 'SearchInput--loading' : ''} 
                  `}
      >
        <i className="fas fa-search SearchInput__search-icon" />
        {this.getOverlay()}
        <SearchResultList inputFocused={this.state.inputFocused} />
        <form onSubmit={this.redirectToSearchPage}>
          <input
            placeholder="Поиск"
            className="SearchInput__search-input"
            type="search"
            value={this.props.searchQuery}
            onChange={this.handleSearchInput}
            onFocus={this.handleSearchFocus}
          />
        </form>
        <i className="fas fa-spinner SearchInput__spinner-icon" />
      </div>
    );
  }
}

SearchInput.defaultProps = {
  requestSearchData: reactUtils.defaultPropsFunc,
  loading: false,
  searchQuery: '',
  history: {
    push: reactUtils.defaultPropsFunc
  }
};

SearchInput.propTypes = {
  requestSearchData: PropTypes.func,
  loading: PropTypes.bool,
  searchQuery: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapStateToProps = state => ({
  loading: state.search.status === 'fetching',
  searchQuery: state.search.searchQuery
});

const mapDispatchToProps = dispatch => ({
  requestSearchData(searchQuery) {
    dispatch(requestSearchData(searchQuery));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchInput)
);
