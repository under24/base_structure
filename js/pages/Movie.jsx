import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { requestMovieSlugData } from '../redux/thunks/movies';
// import './Movie.scss';

const TitleHeader = () => (
  <header className="header">
    <nav className="navbar">navbar</nav>
    <div className="title-container">
      <h1 className="header-title">title here</h1>
      <h2 className="header-subtitle">subtitle here</h2>
    </div>
  </header>
);

/* 
 * /movies/:slug
 */
class Movie extends Component {
  // when urls changes then request new movie data
  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.requestMovieSlugData(this.getSlug());
    });
  }

  // request movie data on init
  componentDidMount() {
    this.props.requestMovieSlugData(this.getSlug());
  }

  // unlisten to url changes after detaching
  componentWillUnmount() {
    this.unlisten();
  }

  // get current movie slug from url
  getSlug() {
    return this.props.match.params.slug;
  }

  render() {
    return (
      <div className="movie">
        <TitleHeader />
        <main>Movie page</main>
        <footer>footer</footer>
        <Link to="/movies/solo-a-star-wars-story-2018">Link</Link>
      </div>
    );
  }
}

Movie.propTypes = {
  requestMovieSlugData: PropTypes.func,
  history: PropTypes.shape({
    listen: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    })
  })
};

const mapDispatchToProps = dispatch => ({
  requestMovieSlugData(slug) {
    dispatch(requestMovieSlugData(slug));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Movie);
