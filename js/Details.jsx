import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAPIDetails } from './actionCreators';
import Header from './Header';
import Spinner from './Spinner';

class Details extends Component {
  componentDidMount() {
    if (!this.props.rating) {
      this.props.getAPIDetails();
    }
  }

  render() {
    const { title, description, year, poster, trailer } = this.props.show;

    let ratingComponent;
    if (this.props.rating) {
      ratingComponent = <h3>{this.props.rating}</h3>;
    } else {
      ratingComponent = <Spinner />;
    }

    return (
      <div className="details">
        <Header />
        <section>
          <h1>{title}</h1>
          {ratingComponent}
          <h2>({year})</h2>
          <img src={`/img/posters/${poster}`} alt={`Poster for ${title}`} />
          <p>{description}</p>
        </section>
        <div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const apiData = state.apiData[ownProps.show.imdbID]
    ? state.apiData[ownProps.show.imdbID]
    : {};

  return {
    rating: apiData.rating
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAPIDetails() {
    dispatch(getAPIDetails(ownProps.show.imdbID));
  }
});

Details.defaultProps = {
  show: {},
  rating: '',
  getAPIDetails: () => {}
};

Details.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    year: PropTypes.string,
    poster: PropTypes.string,
    trailer: PropTypes.string,
    imdbID: PropTypes.string
  }),
  rating: PropTypes.string,
  getAPIDetails: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
