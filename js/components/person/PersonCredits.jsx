import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PersonCreditsItem from './PersonCreditsItem';
import './PersonCredits.scss';

class PersonCredits extends Component {
  state = {
    renderMode: 'all',
    renderUnpopular: false,
    sortBy: 'date', // 'date', 'voteAverage', 'popularity',
    filterValue: ''
  };

  setRenderMode = renderMode => {
    this.setState({ renderMode });
  };

  handleRenderMode = event => {
    const renderMode = event.currentTarget.dataset.controls;
    this.setRenderMode(renderMode);
  };

  handleFilterValueChange = event => {
    this.setState({
      filterValue: event.target.value
    });
  };

  adaptDate = dateString => dateString.slice(0, 4);

  adaptItemData(data) {
    let result = {};

    if (data.media_type === 'movie') {
      result = {
        poster: data.poster_path || '',
        backdrop: data.backdrop_path || '',
        title: data.title || '',
        originalTitle: data.original_title || '',
        character: data.character || '',
        castInEpisodes: '',
        releaseDate: data.release_date ? this.adaptDate(data.release_date) : '',
        mediaType: 'movie'
      };
    } else if (data.media_type === 'tv') {
      result = {
        poster: data.poster_path || '',
        backdrop: data.backdrop_path || '',
        title: data.name || '',
        originalTitle: data.original_name || '',
        character: data.character || '',
        castInEpisodes: data.episode_count ? String(data.episode_count) : '',
        releaseDate: data.first_air_date
          ? this.adaptDate(data.first_air_date)
          : '',
        mediaType: 'tv'
      };
    }

    return result;
  }

  render() {
    let cast = '';
    if (
      this.props.credits &&
      this.props.credits.cast &&
      this.props.credits.cast.length
    ) {
      cast = (
        <div>
          <div>cast</div>
          <div className="PersonCredits__controls">
            <button
              onClick={this.handleRenderMode}
              data-controls="all"
              className={this.state.renderMode === 'all' ? 'highlighted' : ''}
            >
              all
            </button>
            <button
              onClick={this.handleRenderMode}
              data-controls="tv"
              className={this.state.renderMode === 'tv' ? 'highlighted' : ''}
            >
              tv
            </button>
            <button
              onClick={this.handleRenderMode}
              data-controls="movie"
              className={this.state.renderMode === 'movie' ? 'highlighted' : ''}
            >
              movie
            </button>
          </div>
          <div className="PersonCredits__filter">
            <input
              type="text"
              value={this.state.filterValue}
              onChange={this.handleFilterValueChange}
            />
          </div>

          {this.props.credits.cast
            // .filter(data => {
            //   debugger;
            //   const searchStr = `${data.title} ${
            //     data.original_title
            //   }`.toLowerCase();
            //
            //   return (
            //     searchStr.indexOf(this.state.filterValue.toLowerCase()) !== -1
            //   );
            // })
            .filter(data => {
              if (this.state.renderMode === 'all') {
                return true;
              } else if (this.state.renderMode === data.media_type) {
                return true;
              }

              return false;
            })
            .filter(data => data.popularity > 1)
            // .filter((data, index) => index < 10)
            .sort((a, b) => b.year - a.year)
            .map(data => {
              const adaptedData = this.adaptItemData(data);

              return (
                <PersonCreditsItem
                  key={data.credit_id}
                  poster={adaptedData.poster}
                  backdrop={adaptedData.backdrop}
                  title={adaptedData.title}
                  originalTitle={adaptedData.originalTitle}
                  character={adaptedData.character}
                  castInEpisodes={adaptedData.castInEpisodes}
                  releaseDate={adaptedData.releaseDate}
                  mediaType={adaptedData.mediaType}
                />
              );
            })}
        </div>
      );
    }

    return (
      <div className={`PersonCredits ${this.props.className}`}>
        <div className="PersonCredits__title">Фильмография:</div>
        {cast}
      </div>
    );
  }
}

PersonCredits.defaultProps = {
  className: '',
  cast: [],
  crew: []
};

PersonCredits.propTypes = {
  className: PropTypes.string,
  cast: PropTypes.arrayOf({}),
  crew: PropTypes.arrayOf({})
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.credits) {
      props.cast = person.credits.cast;
      props.crew = person.credits.crew;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonCredits);
