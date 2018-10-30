import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DynamicImage from './DynamicImage';
import './PersonTaggedImages.scss';

const PersonTaggedImages = props => (
  <div className={`PersonTaggedImages ${props.className}`}>
    <div>Кадры:</div>
    <div className="tagged-images">
      {props.taggedImages.filter(item => item.aspect_ratio > 1).map(item => {
        return (
          <img
            src={`https://image.tmdb.org/t/p/w300${item.file_path}`}
            alt={item.vote_average}
          />
        );
      })}
    </div>
  </div>
);

PersonTaggedImages.defaultProps = {
  className: ''
};

PersonTaggedImages.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  let taggedImages = [];

  if (
    state.people[ownProps.slug] &&
    state.people[ownProps.slug].viewData &&
    state.people[ownProps.slug].viewData.taggedImages &&
    state.people[ownProps.slug].viewData.taggedImages.length
  ) {
    taggedImages = state.people[ownProps.slug].viewData.taggedImages;
  }

  return { taggedImages };
};

export default connect(mapStateToProps)(PersonTaggedImages);
