import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageCarousel from '../PageCarousel';

const PersonPageCarousel = props => <PageCarousel images={props.images} />;

PersonPageCarousel.defaultProps = {
  images: []
};

PersonPageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.images) {
      props.images = person.images;
    }

    // if (person.taggedImages) {
    //   props.taggedImages = {
    //     amount: person.taggedImages.totaResults,
    //     imgs: person.taggedImages.pages[1]
    //   }
    // }
  }

  return props;
};

export default connect(mapStateToProps)(PersonPageCarousel);
