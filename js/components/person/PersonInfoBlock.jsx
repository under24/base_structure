import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfoBlock from '../InfoBlock';

const PersonInfoBlock = props => <InfoBlock items={props.items} />;

PersonInfoBlock.defaultProps = {
  items: []
};

PersonInfoBlock.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.number
    })
  )
};

const mapStateToProps = (state, ownProps) => {
  const props = {
    items: []
  };

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.items.push({
        label: 'Популярность',
        value: person.details.popularity,
        link: '/people/'
      });
    }

    if (person.credits) {
      props.items.push({
        label: 'Фильмы',
        value: person.credits.cast.movie.length
      });
      props.items.push({
        label: 'ТВ-Шоу',
        value: person.credits.cast.tv.length
      });
      props.items.push({
        label: 'Другое',
        value: person.credits.crew.length
      });
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonInfoBlock);
