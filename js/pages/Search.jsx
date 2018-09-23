import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowCard from '../components/ShowCard';
import Header from '../components/Header';

const Search = props => (
  <div className="search">
    <Header showSearch />
    <div>
      {props.shows
        .filter(show => {
          const searchTerm = props.searchTerm.toUpperCase();
          const showCardText = `${show.title} ${
            show.description
          }`.toUpperCase();

          return showCardText.indexOf(searchTerm) >= 0;
        })
        .map(show => <ShowCard key={show.imdbID} {...show} />)}
    </div>
  </div>
);

Search.defaultProps = {
  searchTerm: '',
  shows: []
};

Search.propTypes = {
  searchTerm: PropTypes.string, // eslint-disable-line
  shows: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
});

export default connect(mapStateToProps)(Search);
