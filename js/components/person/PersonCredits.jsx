import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonCreditsItem from './PersonCreditsItem';
import scrollUtils from '../../utils/scrollUtils';
import './PersonCredits.scss';

class PersonCredits extends Component {
  state = {
    renderMode: 'combined', // 'movie', 'tv', 'combined'
    renderedItems: 20,
    sortBy: 'date', // 'date', 'voteAverage', 'popularity',
    filterValue: '',
    showUpcoming: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getRenderControls() {
    return (
      <div className="PersonCredits__render-mode-controls">
        <div
          onClick={this.handleRenderModeChange}
          data-render-mode="combined"
          className={`PersonCredits__render-mode-control-item ${
            this.state.renderMode === 'combined'
              ? 'PersonCredits__render-mode-control-item--highlighted'
              : ''
          }`}
        >
          Все<sup>{this.props.combined.length}</sup>
        </div>
        <div
          onClick={this.handleRenderModeChange}
          data-render-mode="tv"
          className={`PersonCredits__render-mode-control-item ${
            this.state.renderMode === 'tv'
              ? 'PersonCredits__render-mode-control-item--highlighted'
              : ''
          }`}
        >
          ТВ-Шоу<sup>{this.props.tv.length}</sup>
        </div>
        <div
          onClick={this.handleRenderModeChange}
          data-render-mode="movie"
          className={`PersonCredits__render-mode-control-item ${
            this.state.renderMode === 'movie'
              ? 'PersonCredits__render-mode-control-item--highlighted'
              : ''
          }`}
        >
          Фильмы<sup>{this.props.movie.length}</sup>
        </div>
      </div>
    );
  }

  getFilterControls() {
    return (
      <div className="PersonCredits__filter-controls">
        <input
          type="text"
          value={this.state.filterValue}
          onChange={this.handleFilterValueChange}
        />
      </div>
    );
  }

  getSortControls() {
    return <div className="PersonCredits__sort-controls">sort</div>;
  }

  getControls() {
    return (
      <div className="PersonCredits__controls-container">
        {this.getRenderControls()}
        {this.getFilterControls()}
        {this.getSortControls()}
      </div>
    );
  }

  showMoreItems() {
    this.setState(state => ({
      renderedItems: state.renderedItems + 15
    }));
  }

  handleScroll = () => {
    const loadMoreNode = document.getElementById('PersonCredits__load-more');

    if (scrollUtils.nodeInViewport(loadMoreNode, 500)) {
      if (!loadMoreNode) {
        return;
      }

      // every item is shown
      if (this.state.renderedItems > this.props[this.state.renderMode].length) {
        return;
      }

      this.showMoreItems();
    }
  };

  handleRenderModeChange = event => {
    const renderMode = event.currentTarget.dataset.renderMode;

    // same mode. bail
    if (this.state.renderMode === renderMode) {
      return;
    }

    this.setState({
      renderMode,
      renderedItems: 20 // reset amount of rendered items
    });
  };

  handleFilterValueChange = event => {
    this.setState({
      filterValue: event.target.value
    });
  };

  render() {
    return (
      <div className={`PersonCredits ${this.props.className}`}>
        <div className="PersonCredits__title">Фильмография</div>
        {this.getControls()}
        <div className="PersonCredits__item-container">
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
            .sort((a, b) => {
              if (!a.releaseDate) {
                return -1;
              }

              return +new Date(b.releaseDate) - +new Date(a.releaseDate);
            })
            // filter out upcoming with no release date
            .filter(data => {
              if (!data.releaseDate) {
                return false;
              }

              return true;
            })
            .filter((data, index) => {
              if (index < this.state.renderedItems) {
                return true;
              }

              return false;
            })
            .map(item => (
              <PersonCreditsItem
                key={item.creditId}
                poster={item.poster}
                backdrop={item.backdrop}
                title={item.title}
                originalTitle={item.originalTitle}
                character={item.character}
                episodeCount={item.episodeCount}
                releaseDate={item.releaseDate}
                mediaType={item.mediaType}
                genres={item.genres}
              />
            ))}
        </div>
        <div id="PersonCredits__load-more" />
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
