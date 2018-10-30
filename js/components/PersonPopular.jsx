import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './PersonPopular.scss';

const PersonPopular = props => (
  <div className={`PersonPopular ${props.className}`}>
    {props.popular.map(person => {
      // debugger;
      return (
        <div className="PersonPopular__person-container">
          <div className="PersonPopular__person-name">{person.name}</div>
          <img alt="" src={`https://image.tmdb.org/t/p/w300${person.image}`} />
          <div className="PersonPopular__known-for">
            {person.knownFor.map(mediaObj => {
              debugger;
              return (
                <div>
                  <img
                    alt=""
                    src={`https://image.tmdb.org/t/p/w300${mediaObj.poster}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </div>
);

PersonPopular.defaultProps = {
  className: '',
  popular: []
};

PersonPopular.propTypes = {
  className: PropTypes.string,
  popular: PropTypes.array
};

const mapStateToProps = state => {
  if (
    state.people &&
    state.people.tmdbPopular &&
    state.people.tmdbPopular.pages['1']
  ) {
    return {
      popular: state.people.tmdbPopular.pages['1'].slice(0, 5)
    };
  }

  return { popular: [] };
};

export default connect(mapStateToProps)(PersonPopular);
