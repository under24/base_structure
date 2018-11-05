import React from 'react';
import PropTypes from 'prop-types';
import './PersonCreditsItem';

const PersonCreditsItem = props => {
  let img;
  if (props.poster) {
    img = (
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/w300${props.poster}`}
        alt=""
      />
    );
  }

  let title = '';
  if (props.title) {
    title = <div className="item-detail item-detail-title">{props.title}</div>;
  }

  let originalTitle = '';
  if (props.title !== props.originalTitle) {
    originalTitle = (
      <div className="item-detail item-detail-orig-title">
        {props.originalTitle}
      </div>
    );
  }

  let inEpisodes = '';
  if (props.episodeCount) {
    inEpisodes = <span>в {props.episodeCount} эпизодах</span>;
  }

  let character = '';
  if (props.character) {
    character = (
      <div className="item-detail item-detail-character">
        В роли: {props.character} {inEpisodes}
      </div>
    );
  }

  let releaseDate = '';
  if (props.releaseDate) {
    const date = props.releaseDate.split('-')[0];

    releaseDate = (
      <div className="item-detail item-detail-release-date">{date}</div>
    );
  }

  let backdrop = '';
  if (props.backdrop) {
    backdrop = (
      <div className="backdrop-container">
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/w500${props.backdrop}`}
          alt=""
        />
      </div>
    );
  }

  // let mediaType = '';
  // if (props.mediaType) {
  //   mediaType = props.mediaType === 'movie' ? 'Фильм' : 'ТВ-Шоу';
  // }

  return (
    <div className="PersonCredits__item">
      <div className="PersonCredits__item-inner-container">
        {img}
        <div className="item-details-text-container">
          {releaseDate}
          {title}
          {originalTitle}
          {character}
        </div>
        {backdrop}
      </div>
    </div>
  );
};

PersonCreditsItem.defaultProps = {
  poster: '',
  backdrop: '',
  title: '',
  originalTitle: '',
  character: '',
  episodeCount: 0,
  releaseDate: '',
  mediaType: ''
};

PersonCreditsItem.propTypes = {
  poster: PropTypes.string,
  backdrop: PropTypes.string,
  title: PropTypes.string,
  originalTitle: PropTypes.string,
  character: PropTypes.string,
  episodeCount: PropTypes.number,
  releaseDate: PropTypes.string,
  mediaType: PropTypes.string
};

export default PersonCreditsItem;
