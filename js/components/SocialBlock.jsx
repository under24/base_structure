import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './SocialBlock.scss';

const SocialBlock = props => {
  let facebook = '';
  let twitter = '';
  let instagram = '';
  let imdb = '';

  if (props.facebook) {
    facebook = (
      <div className="SocialBlock__link">
        <a href={props.facebook}>Facebook</a>
      </div>
    );
  }

  if (props.imdb) {
    imdb = (
      <div className="SocialBlock__link">
        <a href={props.imdb}>IMDB</a>
      </div>
    );
  }

  if (props.twitter) {
    twitter = (
      <div className="SocialBlock__link">
        <a href={props.twitter}>Twitter</a>
      </div>
    );
  }

  if (props.instagram) {
    instagram = (
      <div className="SocialBlock__link">
        <a href={props.instagram}>Instagram</a>
      </div>
    );
  }

  return (
    <div className="SocialBlock">
      {facebook}
      {twitter}
      {instagram}
      {imdb}
    </div>
  );
};

SocialBlock.defaultProps = {
  facebook: '',
  imdb: '',
  instagram: '',
  twitter: ''
};

SocialBlock.propTypes = {
  facebook: PropTypes.string,
  imdb: PropTypes.string,
  instagram: PropTypes.string,
  twitter: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (
    state.person[ownProps.tmdbId] &&
    state.person[ownProps.tmdbId].externalIds
  ) {
    props.instagram = state.person[ownProps.tmdbId].externalIds.instagram;
    props.facebook = state.person[ownProps.tmdbId].externalIds.facebook;
    props.twitter = state.person[ownProps.tmdbId].externalIds.twitter;
    props.imdb = state.person[ownProps.tmdbId].externalIds.imdb;
  }

  return props;
};

export default connect(mapStateToProps)(SocialBlock);
