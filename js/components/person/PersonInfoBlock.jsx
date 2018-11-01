import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfoBlockItem from '../InfoBlockItem';
import './PersonInfoBlock.scss';

const PersonInfoBlock = props => (
  <div className="PersonInfoBlock">
    <InfoBlockItem value={props.popularity} label="Популярность" />
    <InfoBlockItem value={props.tv} label="ТВ-Шоу" />
    <InfoBlockItem value={props.movie} label="Фильмы" />
    <InfoBlockItem value={props.other} label="Другое" />
  </div>
);

PersonInfoBlock.defaultProps = {
  tv: 0,
  movie: 0,
  other: 0,
  popularity: 0
};

PersonInfoBlock.propTypes = {
  tv: PropTypes.number,
  movie: PropTypes.number,
  other: PropTypes.number,
  popularity: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.popularity = person.details.popularity;
    }

    if (person.credits) {
      props.movie = person.credits.cast.movie.length;
      props.tv = person.credits.cast.tv.length;
      props.other = person.credits.crew.length;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonInfoBlock);
