import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './PersonInfoBlock.scss';

const PersonInfoBlock = props => (
  <div className="PersonInfoBlock">
    <div className="PersonInfoBlock__item">
      <span className="PersonInfoBlock__item-value">{props.popularity}</span>
      <span className="PersonInfoBlock__item-label">Популярность</span>
    </div>
    <div className="PersonInfoBlock__item">
      <span className="PersonInfoBlock__item-value">{props.tv}</span>
      <span className="PersonInfoBlock__item-label">ТВ-Шоу</span>
    </div>
    <div className="PersonInfoBlock__item">
      <span className="PersonInfoBlock__item-value">{props.movie}</span>
      <span className="PersonInfoBlock__item-label">Фильмы</span>
    </div>
    <div className="PersonInfoBlock__item">
      <span className="PersonInfoBlock__item-value">0</span>
      <span className="PersonInfoBlock__item-label">Другое</span>
    </div>
    <div className="PersonInfoBlock__item">
      <span className="PersonInfoBlock__item-value">{props.all}</span>
      <span className="PersonInfoBlock__item-label">Всего</span>
    </div>
  </div>
);

PersonInfoBlock.defaultProps = {
  all: 0,
  tv: 0,
  movie: 0,
  popularity: 0
};

PersonInfoBlock.propTypes = {
  all: PropTypes.number,
  tv: PropTypes.number,
  movie: PropTypes.number,
  popularity: PropTypes.number
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.popularity = person.details.popularity;
    }

    // if (person.credits) {
    //   const credits = person.credits;
    //
    //
    // }
  }

  if (state.person[ownProps.tmdbId] && state.person[ownProps.tmdbId].credits) {
    if (state.person[ownProps.tmdbId].credits.cast.length) {
      let all = 0;
      let tv = 0;
      let movie = 0;

      state.person[ownProps.tmdbId].credits.cast.forEach(item => {
        all += 1;

        if (item.mediaType === 'movie') {
          movie += 1;
        }

        if (item.mediaType === 'tv') {
          tv += 1;
        }
      });
      props.all = all;
      props.tv = tv;
      props.movie = movie;
    }
    if (state.person[ownProps.tmdbId].credits.crew.length) {
      // debugger;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonInfoBlock);
