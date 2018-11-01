import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonCreditsItem from './PersonCreditsItem';
import './PersonCredits.scss';

class PersonCredits extends Component {
  state = {
    renderMode: 'combined', // 'movie', 'tv', 'combined'
    // renderUnpopular: false,
    sortBy: 'date', // 'date', 'voteAverage', 'popularity',
    filterValue: ''
  };

  handleRenderMode = event => {
    const renderMode = event.currentTarget.dataset.renderMode;

    this.setState({
      renderMode
    });
  };

  handleFilterValueChange = event => {
    this.setState({
      filterValue: event.target.value
    });
  };

  getRenderControls() {
    return (
      <div className="PersonCredits__controls">
        <button
          onClick={this.handleRenderMode}
          data-render-mode="combined"
          className={this.state.renderMode === 'combined' ? 'highlighted' : ''}
        >
          combined<sup>{this.props.combined.length}</sup>
        </button>
        <button
          onClick={this.handleRenderMode}
          data-render-mode="tv"
          className={this.state.renderMode === 'tv' ? 'highlighted' : ''}
        >
          tv<sup>{this.props.tv.length}</sup>
        </button>
        <button
          onClick={this.handleRenderMode}
          data-render-mode="movie"
          className={this.state.renderMode === 'movie' ? 'highlighted' : ''}
        >
          movie<sup>{this.props.movie.length}</sup>
        </button>
      </div>
    );
  }

  getFilterControls() {
    return (
      <div>
        <input
          type="text"
          value={this.state.filterValue}
          onChange={this.handleFilterValueChange}
        />
      </div>
    );
  }

  getSortControls() {
    return <div>sort</div>;
  }

  render() {
    return (
      <div className={`PersonCredits ${this.props.className}`}>
        <div className="PersonCredits__title">Фильмография:</div>
        <div className="PersonCredits__controls-container">
          {this.getRenderControls()}
          {this.getFilterControls()}
          {this.getSortControls()}
        </div>
        {this.props[this.state.renderMode]
          .filter(data => {
            const searchStr = `${data.title} ${
              data.originalTitle
            }`.toLowerCase();

            return (
              searchStr.indexOf(this.state.filterValue.toLowerCase()) !== -1
            );
          })
          // .filter(data => data.popularity > 1)
          .sort((a, b) => +new Date(b.releaseDate) - +new Date(a.releaseDate))
          .map(item => {
            return (
              <PersonCreditsItem
                key={item.creditId}
                poster={item.poster}
                backdrop={item.backdrop}
                title={item.title}
                originalTitle={item.originalTitle}
                character={item.character}
                castInEpisodes={item.episodeCount}
                releaseDate={item.releaseDate}
                mediaType={item.mediaType}
              />
            );
          })}
      </div>
    );
  }
}

PersonCredits.defaultProps = {
  className: '',
  movie: [],
  tv: [],
  combined: [],
  other: []
};

PersonCredits.propTypes = {
  className: PropTypes.string,
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      adult: PropTypes.bool,
      backdrop: PropTypes.string,
      character: PropTypes.string,
      creditId: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.number),
      id: PropTypes.number,
      link: PropTypes.string,
      mediaType: PropTypes.string,
      originalLanguage: PropTypes.string,
      originalTitle: PropTypes.string,
      overview: PropTypes.string,
      popularity: PropTypes.number,
      poster: PropTypes.string,
      releaseDate: PropTypes.string,
      title: PropTypes.string,
      video: PropTypes.bool,
      voteAverage: PropTypes.number,
      voteCount: PropTypes.number
    })
  ),
  tv: PropTypes.arrayOf(PropTypes.shape({})),
  combined: PropTypes.arrayOf(PropTypes.shape({})),
  other: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.credits) {
      props.movie = person.credits.cast.movie;
      props.tv = person.credits.cast.tv;
      props.combined = person.credits.cast.combined;
      props.other = person.credits.crew;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonCredits);
