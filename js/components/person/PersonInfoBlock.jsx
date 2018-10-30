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
      <span className="PersonInfoBlock__item-value">{props.other}</span>
      <span className="PersonInfoBlock__item-label">Другое</span>
    </div>
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
      let movie = 0;
      let tv = 0;
      let other = 0;

      person.credits.cast.forEach(item => {
        if (item.mediaType === 'movie') {
          movie += 1;
        } else if (item.mediaType === 'tv') {
          tv += 1;
        }
      });

      person.credits.crew.forEach(() => (other += 1));

      props.movie = movie;
      props.tv = tv;
      props.other = other;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonInfoBlock);
