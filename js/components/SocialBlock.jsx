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
      <div className="SocialBlock__item">
        <a
          className="SocialBlock__link"
          target="_blank"
          rel="noopener noreferrer"
          href={props.facebook}
        >
          <span className="SocialBlock__link-text">Facebook</span>
          <i className="fab fa-facebook-square SocialBlock__link-icon" />
        </a>
      </div>
    );
  }

  if (props.imdb) {
    imdb = (
      <div className="SocialBlock__item">
        <a
          className="SocialBlock__link"
          target="_blank"
          rel="noopener noreferrer"
          href={props.imdb}
        >
          <span className="SocialBlock__link-text">IMDB</span>
          <i className="fab fa-imdb SocialBlock__link-icon" />
        </a>
      </div>
    );
  }

  if (props.twitter) {
    twitter = (
      <div className="SocialBlock__item">
        <a
          className="SocialBlock__link"
          target="_blank"
          rel="noopener noreferrer"
          href={props.twitter}
        >
          <span className="SocialBlock__link-text">Twitter</span>
          <i className="fab fa-twitter-square SocialBlock__link-icon" />
        </a>
      </div>
    );
  }

  if (props.instagram) {
    instagram = (
      <div className="SocialBlock__item">
        <a
          className="SocialBlock__link"
          target="_blank"
          rel="noopener noreferrer"
          href={props.instagram}
        >
          <span className="SocialBlock__link-text">Instagram</span>
          <i className="fab fa-instagram SocialBlock__link-icon" />
        </a>
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
