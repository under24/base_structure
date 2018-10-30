import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DynamicImage from '../DynamicImage';
import './PersonPortrait.scss';

const PersonPortrait = props => (
  <div className="PersonPortrait">
    <DynamicImage url={props.image} alt={props.name} />
  </div>
);

PersonPortrait.defaultProps = {
  image: '',
  name: ''
};

PersonPortrait.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details && person.details.image) {
      props.image = `https://image.tmdb.org/t/p/w300${
        state.person[ownProps.tmdbId].details.image
      }`;
      props.name = person.details.name;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonPortrait);
