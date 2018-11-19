import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SearchResultItem.scss';

class SearchResultItem extends Component {
  getIcon() {
    let icon = null;

    if (this.props.mediaType === 'tv') {
      icon = <i className="fas fa-tv SearchResultItem__media-icon" />;
    } else if (this.props.mediaType === 'movie') {
      icon = <i className="fas fa-film SearchResultItem__media-icon" />;
    } else if (this.props.mediaType === 'person') {
      icon = <i className="far fa-user SearchResultItem__media-icon" />;
    }

    return icon;
  }

  getReleaseDate() {
    let releaseDate = null;

    if (this.props.releaseDate) {
      releaseDate = (
        <div className="SearchResultItem__release-date">
          {new Date(this.props.releaseDate).getFullYear()}
        </div>
      );
    }

    return releaseDate;
  }

  getOriginalTitle() {
    let originalTitle = null;

    if (
      this.props.originalTitle &&
      this.props.originalTitle !== this.props.title
    ) {
      originalTitle = (
        <div
          className="SearchResultItem__original-title"
          title={this.props.originalTitle}
        >
          {this.props.originalTitle}
        </div>
      );
    }

    return originalTitle;
  }

  getImage() {
    let image;

    if (this.props.poster) {
      image = (
        <img
          className="SearchResultItem__poster"
          src={`https://image.tmdb.org/t/p/w300${this.props.poster}`}
          alt={`${this.props.originalTitle} poster`}
        />
      );
    } else {
      image = <div className="SearchResultItem__poster-placeholder" />;
    }

    return image;
  }

  render() {
    return (
      <Link className="SearchResultItem" to={this.props.link}>
        <div className="SearchResultItem__poster-container">
          {this.getImage()}
        </div>
        <div className="SearchResultItem__text-container">
          <div className="SearchResultItem__title" title={this.props.title}>
            {this.props.title}
          </div>
          {this.getOriginalTitle()}
        </div>
        {this.getReleaseDate()}
        {this.getIcon()}
      </Link>
    );
  }
}

SearchResultItem.defaultProps = {
  mediaType: undefined,
  releaseDate: undefined,
  originalTitle: undefined,
  poster: undefined,
  title: undefined,
  link: undefined
};

SearchResultItem.propTypes = {
  mediaType: PropTypes.string,
  releaseDate: PropTypes.string,
  originalTitle: PropTypes.string,
  poster: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string
};

export default SearchResultItem;
