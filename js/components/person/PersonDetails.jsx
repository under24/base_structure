import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import utils from '../../utils/reactUtils';
import './PersonDetails.scss';

class PersonDetails extends Component {
  state = {
    biographyExpanded: false
  };

  getBiographyText() {
    let biography = this.props.biography;

    if (!this.state.biographyExpanded && biography.length > 300) {
      biography = `${biography.slice(0, 300)}... `;
    }

    return biography;
  }

  getBiographyReadMore() {
    let readMore = '';

    if (!this.state.biographyExpanded && this.props.biography.length > 300) {
      readMore = (
        <a
          className="expander"
          onClick={this.expandBiography}
          role="presentation"
        >
          Показать полностью
        </a>
      );
    }

    return readMore;
  }

  getBiography() {
    let biography = '';

    if (this.props.biography) {
      biography = (
        <div className="PersonDetails__detail-container PersonDetails__biography">
          <span className="PersonDetails__detail-title">Биография:</span>
          <span>{this.getBiographyText()}</span>
          {this.getBiographyReadMore()}
        </div>
      );
    }

    return biography;
  }

  getAge() {
    let age = '';

    if (this.props.age) {
      age = (
        <div className="PersonDetails__detail-container PersonDetails__age">
          <span className="PersonDetails__detail-title">Возраст:</span>
          <span>{this.props.age}</span>
        </div>
      );
    }

    return age;
  }

  getBirthday() {
    let birthday = '';

    if (this.props.birthday) {
      birthday = (
        <div className="PersonDetails__detail-container PersonDetails__birthday">
          <span className="PersonDetails__detail-title">Дата рождения:</span>
          <span>{this.props.birthday}</span>
        </div>
      );
    }
    return birthday;
  }

  getBirthplace() {
    let birthplace = '';

    if (this.props.birthplace) {
      birthplace = (
        <div className="PersonDetails__detail-container PersonDetails__birthplace">
          <span className="PersonDetails__detail-title">Место рождения:</span>
          <span>{this.props.birthplace}</span>
        </div>
      );
    }

    return birthplace;
  }

  getDeathday() {
    let deathday = '';

    if (this.props.deathday) {
      deathday = (
        <div className="PersonDetails__detail-container PersonDetails__deathday">
          <span className="PersonDetails__detail-title">Дата смерти:</span>
          <span>{this.props.deathday}</span>
        </div>
      );
    }

    return deathday;
  }

  getHomepage() {
    let homepage = '';

    if (this.props.homepage) {
      homepage = (
        <div className="PersonDetails__detail-container PersonDetails__homepage">
          <span className="PersonDetails__detail-title">Официальный сайт:</span>
          <span>{this.props.homepage}</span>
        </div>
      );
    }

    return homepage;
  }

  expandBiography = () => {
    this.setState({
      biographyExpanded: true
    });
  };

  render() {
    return (
      <div className={`PersonDetails ${this.props.className}`}>
        {this.getAge()}
        {this.getBirthday()}
        {this.getBirthplace()}
        {this.getDeathday()}
        {this.getHomepage()}
        {this.getBiography()}
      </div>
    );
  }
}

PersonDetails.defaultProps = {
  className: '',
  age: '',
  birthday: '',
  birthplace: '',
  deathday: '',
  homepage: '',
  biography: ''
};

PersonDetails.propTypes = {
  className: PropTypes.string,
  age: PropTypes.string,
  birthday: PropTypes.string,
  birthplace: PropTypes.string,
  deathday: PropTypes.string,
  homepage: PropTypes.string,
  biography: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.biography = person.details.biography;
      props.birthplace = person.details.birthplace;
      props.homepage = person.details.homepage;
    }

    if (person.details && person.details.birthday) {
      props.birthday = utils.normalizeDate(person.details.birthday);
      props.age = utils.getAgeFromDate(person.details.birthday);
    }

    if (person.details && person.details.deathday) {
      props.deathday = utils.normalizeDate(person.details.deathday);
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonDetails);
