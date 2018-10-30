import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PersonInfoBlock from './PersonInfoBlock';
import './PersonHeader.scss';

const PersonHeader = props => (
  <header className="PersonHeader">
    <div className="PersonHeader__backdrop-image" />
    <div className="PersonHeader__person-name">
      <div className="container">{props.name}</div>
    </div>
    <div className="PersonHeader__bottom-strip">
      <div className="container">
        <PersonInfoBlock tmdbId={props.tmdbId} />
      </div>
    </div>
  </header>
);

PersonHeader.propTypes = {
  name: PropTypes.string,
  tmdbId: PropTypes.string
};

PersonHeader.defaultProps = {
  name: '',
  tmdbId: ''
};

const mapStateToProps = (state, ownProps) => {
  const props = {};

  if (state.person[ownProps.tmdbId]) {
    const person = state.person[ownProps.tmdbId];

    if (person.details) {
      props.name = person.details.name;
    }
  }

  return props;
};

export default connect(mapStateToProps)(PersonHeader);
